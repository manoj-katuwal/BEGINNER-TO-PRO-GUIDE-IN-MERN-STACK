import bcrypt from "bcrypt";
import * as authRepository from "./auth.repository.js";
import AppError from "../../shared/utils/AppError.js";
import { generateToken } from "../../shared/utils/generateToken.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import generateRefreshToken from "../../shared/utils/generateRefreshToken.js";
import * as refreshTokenRepository from "../refreshToken/refreshToken.repository.js";
import AUTH_MESSAGES from "../../constants/messages.js";
import HTTP_STATUS from "../../constants/httpStatus.js";
import hashToken from "../../shared/utils/hashedToken.js";
import sequelize from "../../config/database.js";
import { logAuthEvent } from "../../shared/utils/logAuthEvent.js";

const getRefreshTokenExpiry = (token) => {
  const { exp } = jwt.decode(token);
  return new Date(exp * 1000);
};

export const register = async (userData, metadata = {}) => {
  const { name, email, password, role } = userData;

  const existingUser = await authRepository.findByEmail(email);

  if (existingUser) {
    logAuthEvent({
      level: "warn",
      event: "REGISTER_FAILED",
      message: "Registration attempted with an existing email address",
      userId: existingUser.id,
      ...metadata,
    });
    throw new AppError("Email already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await authRepository.createUser({
    name,
    email,
    password: hashedPassword,
    role: "user",
  });

  logAuthEvent({
    event: "REGISTER_SUCCESS",
    message: "User registered successfully",
    userId: user.id,
    ...metadata,
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

export const loginUser = async (credientials, metadata = {}) => {
  const { email, password } = credientials;

  const user = await authRepository.findByEmail(email);

  if (!user) {
    logAuthEvent({
      level: "warn",
      event: "LOGIN_FAILED",
      message: "Invalid login attempt",
      ...metadata,
    });
    throw new AppError("Invalid email or password", 400);
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    logAuthEvent({
      level: "warn",
      event: "LOGIN_FAILED",
      message: "Invalid login attempt",
      userId: user.id,
      ...metadata,
    });
    throw new AppError("Invalid email or password", 400);
  }

  const token = generateToken(user);
  const refreshToken = generateRefreshToken({
    userId: user.id,
  });

  const hashedRefreshToken = hashToken(refreshToken);
  const familyId = crypto.randomUUID();

  await refreshTokenRepository.createRefreshToken({
    userId: user.id,
    token: hashedRefreshToken,
    familyId,
    expiresAt: getRefreshTokenExpiry(refreshToken),
  });

  return {
    token,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  };
};

export const refreshToken = async (refreshToken, metadata = {}) => {
  if (!refreshToken) {
    logAuthEvent({
      level: "warn",
      event: "TOKEN_REFRESH_FAILED",
      message: "Refresh token was not provided",
      ...metadata,
    });
    throw new AppError(
      AUTH_MESSAGES.REFRESH_TOKEN_REQUIRED,
      HTTP_STATUS.BAD_REQUEST,
    );
  }

  let decoded;

  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    logAuthEvent({
      level: "warn",
      event: "TOKEN_REFRESH_FAILED",
      message: "Invalid refresh token",
      ...metadata,
    });
    throw new AppError(AUTH_MESSAGES.INVALID_TOKEN, HTTP_STATUS.UNAUTHORIZED);
  }

  const hashedToken = hashToken(refreshToken);

  const session = await refreshTokenRepository.findByToken(hashedToken);

  if (!session || session.userId !== decoded.userId) {
    logAuthEvent({
      level: "warn",
      event: "TOKEN_REFRESH_FAILED",
      message: "Refresh token session was not found",
      userId: decoded.userId,
      ...metadata,
    });
    throw new AppError(AUTH_MESSAGES.INVALID_TOKEN, HTTP_STATUS.UNAUTHORIZED);
  }

  if (session.revokedAt) {
    // Revoke the entire token family
    await refreshTokenRepository.revokeFamily(session.familyId);

    logAuthEvent({
      level: "warn",
      event: "REFRESH_TOKEN_REUSE_DETECTED",
      message: "A revoked refresh token was reused",
      userId: session.userId,
      familyId: session.familyId,
      ...metadata,
    });

    throw new AppError(
      AUTH_MESSAGES.REFRESH_TOKEN_REUSE,
      HTTP_STATUS.UNAUTHORIZED,
    );
  }

  if (session.expiresAt < new Date()) {
    await refreshTokenRepository.revoke(session.id);

    logAuthEvent({
      level: "warn",
      event: "TOKEN_REFRESH_FAILED",
      message: "Expired refresh token was used",
      userId: session.userId,
      familyId: session.familyId,
      ...metadata,
    });

    throw new AppError(AUTH_MESSAGES.INVALID_TOKEN, HTTP_STATUS.UNAUTHORIZED);
  }

  const user = await authRepository.findById(decoded.userId);

  if (!user) {
    await refreshTokenRepository.revoke(session.id);

    logAuthEvent({
      level: "warn",
      event: "TOKEN_REFRESH_FAILED",
      message: "Refresh token belongs to a missing user",
      userId: decoded.userId,
      familyId: session.familyId,
      ...metadata,
    });

    throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND, HTTP_STATUS.UNAUTHORIZED);
  }

  const newAccessToken = generateToken(user);

  const newRefreshToken = generateRefreshToken({
    userId: user.id,
  });

  const newHashedToken = hashToken(newRefreshToken);

  const expiresAt = getRefreshTokenExpiry(newRefreshToken);

  const reuseDetected = await sequelize.transaction(async (transaction) => {
    const lockedSession = await refreshTokenRepository.findByToken(
      hashedToken,
      {
        transaction,
        lock: transaction.LOCK.UPDATE,
      },
    );

    if (!lockedSession || lockedSession.userId !== decoded.userId) {
      throw new AppError(AUTH_MESSAGES.INVALID_TOKEN, HTTP_STATUS.UNAUTHORIZED);
    }

    if (lockedSession.revokedAt) {
      await refreshTokenRepository.revokeFamily(
        lockedSession.familyId,
        transaction,
      );
      return true;
    }

    const [revokedCount] = await refreshTokenRepository.revoke(
      lockedSession.id,
      transaction,
    );

    if (revokedCount !== 1) {
      await refreshTokenRepository.revokeFamily(
        lockedSession.familyId,
        transaction,
      );
      return true;
    }

    await refreshTokenRepository.createRefreshToken(
      {
        userId: user.id,
        token: newHashedToken,
        familyId: lockedSession.familyId,
        expiresAt,
      },
      { transaction },
    );

    return false;
  });

  if (reuseDetected) {
    logAuthEvent({
      level: "warn",
      event: "REFRESH_TOKEN_REUSE_DETECTED",
      message: "A refresh token was reused during rotation",
      userId: user.id,
      familyId: session.familyId,
      ...metadata,
    });
    throw new AppError(
      AUTH_MESSAGES.REFRESH_TOKEN_REUSE,
      HTTP_STATUS.UNAUTHORIZED,
    );
  }

  logAuthEvent({
    event: "TOKEN_REFRESHED",
    message: "Refresh token rotated successfully",
    userId: user.id,
    familyId: session.familyId,
    ...metadata,
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

export const logout = async (refreshToken, metadata = {}) => {
  if (!refreshToken) {
    logAuthEvent({
      level: "warn",
      event: "LOGOUT_FAILED",
      message: "Refresh token was not provided",
      ...metadata,
    });
    throw new AppError(
      AUTH_MESSAGES.REFRESH_TOKEN_REQUIRED,
      HTTP_STATUS.BAD_REQUEST,
    );
  }

  const hashedToken = hashToken(refreshToken);

  const session = await refreshTokenRepository.findByToken(hashedToken);

  if (!session) {
    logAuthEvent({
      level: "warn",
      event: "LOGOUT_FAILED",
      message: "Refresh token session was not found",
      ...metadata,
    });
    throw new AppError(AUTH_MESSAGES.INVALID_TOKEN, HTTP_STATUS.UNAUTHORIZED);
  }

  if (session.revokedAt) {
    logAuthEvent({
      event: "LOGOUT_ALREADY_COMPLETED",
      message: "Logout requested for an already revoked session",
      userId: session.userId,
      familyId: session.familyId,
      ...metadata,
    });
    return null;
  }

  const transaction = await sequelize.transaction();

  try {
    await refreshTokenRepository.revoke(session.id, transaction);
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    logAuthEvent({
      level: "error",
      event: "LOGOUT_FAILED",
      message: "Failed to revoke refresh token session",
      userId: session.userId,
      familyId: session.familyId,
      ...metadata,
    });
    throw error;
  }

  logAuthEvent({
    event: "LOGOUT_SUCCESS",
    message: "User logged out successfully",
    userId: session.userId,
    familyId: session.familyId,
    ...metadata,
  });

  return null;
};
