// constants/messages.js

export const AUTH_MESSAGES = {
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
  SKILL_CREATE_SUCCESS: "User skill added successfully.",
  SKILL_FETCH_SUCCESS: "User skills retrieved successfully.",
  SKILL_UPDATE_SUCCESS: "User skill updated successfully.",
  SKILL_DELETE_SUCCESS: "User skill deleted successfully.",
  SKILL_NOT_FOUND: "The requested skill could not be found.",
  SKILL_ALREADY_EXISTS: "This skill has already been added to your profile.",
};

export const USER_SETTINGS_MESSAGES = {
  SETTINGS_FETCH_SUCCESS: "User settings retrieved successfully.",
  SETTINGS_UPDATE_SUCCESS: "User settings have been successfully updated.",
  SETTINGS_RESET_SUCCESS: "User settings reset to default values successfully.",
  SETTINGS_NOT_FOUND: "The requested settings could not be found.",
};

export const GITHUB_OAUTH_MESSAGES = {
  CONNECT_SUCCESS: "GitHub account connected successfully.",
  DISCONNECT_SUCCESS: "GitHub account disconnected successfully.",
  ALREADY_CONNECTED: "This GitHub account is already linked to a user.",
  USER_ALREADY_LINKED:
    "Your DevTrack account is already linked to a GitHub profile.",
  AUTH_SUCCESS: "Authenticated via GitHub successfully. Welcome back.",
  STATE_MISMATCH:
    "Security validation failed. State parameter mismatch or expired.",
  CODE_REQUIRED: "Authorization code missing from GitHub redirect.",
  TOKEN_EXCHANGE_FAILED:
    "Failed to exchange authorization code for GitHub access token.",
  PROFILE_FETCH_FAILED: "Failed to retrieve profile data from GitHub.",
  OAUTH_TIMEOUT:
    "The GitHub authentication session has timed out. Please try again.",
    OAUTH_VERIFIED : "GitHub OAuth state verified successfully."

};

export default AUTH_MESSAGES;
