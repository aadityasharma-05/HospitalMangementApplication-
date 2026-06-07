// Frontend Error Constants

export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  SERVER_ERROR: "Server error. Please try again later.",
  INVALID_CREDENTIALS: "Invalid email or password.",
  EMAIL_EXISTS: "Email already registered.",
  VALIDATION_ERROR: "Please check your input and try again.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  SESSION_EXPIRED: "Your session has expired. Please login again.",
  SOMETHING_WENT_WRONG: "Something went wrong. Please try again.",
};

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Login successful!",
  REGISTRATION_SUCCESS: "Registration successful!",
  APPOINTMENT_BOOKED: "Appointment booked successfully!",
  MESSAGE_SENT: "Message sent successfully!",
  PROFILE_UPDATED: "Profile updated successfully!",
};

export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};
