const AUTH_MESSAGES = {
  REGISTER_SUCCESS: "User registration completed successfully.",

  LOGIN_SUCCESS: "Authentication successful. Welcome back.",

  EMAIL_ALREADY_EXISTS: "The provided email address is already registered.",

  INVALID_CREDENTIALS: "Invalid email address or password.",

  USER_NOT_FOUND: "No account found with the associated details.",

  UNAUTHORIZED: "Access denied. Authentication credentials are required.",

  REFRESH_TOKEN_REQUIRED: "Session renewal failed. Refresh token is required.",

  INVALID_TOKEN: "The provided token is invalid or has expired.",

  TOKEN_REFRESED: "Session extended successfully.",

  TOKEN_REFRESHED: "Access token has been successfully renewed.",

  LOGOUT_SUCCESS: "Logged out successfully. Session terminated.",

  REFRESH_TOKEN_REUSE:
    "Security alert: Refresh token reuse detected. Please re-authenticate.",

  PROFILE_FETCH: "User profile data retrieved successfully.",

  PROFILE_UPDATE: "User profile updates have been successfully applied.",
};

export default AUTH_MESSAGES;
