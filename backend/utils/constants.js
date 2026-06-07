// Backend utilities - Constants
export const USER_ROLES = {
  PATIENT: "Patient",
  DOCTOR: "Doctor",
  ADMIN: "Admin",
};

export const GENDERS = {
  MALE: "Male",
  FEMALE: "Female",
};

export const APPOINTMENT_STATUS = {
  PENDING: "Pending",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
  COMPLETED: "Completed",
};

export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  PHONE_LENGTH: 11,
  AADHAAR_LENGTH: 13,
  FIRST_NAME_MIN: 3,
  LAST_NAME_MIN: 3,
};

export const API_MESSAGES = {
  SUCCESS: "Request processed successfully",
  INVALID_INPUT: "Invalid input provided",
  UNAUTHORIZED: "Unauthorized access",
  FORBIDDEN: "Forbidden",
  NOT_FOUND: "Resource not found",
  INTERNAL_SERVER_ERROR: "Internal server error",
  USER_ALREADY_EXISTS: "User already registered with this email",
  INVALID_CREDENTIALS: "Invalid email or password",
  PASSWORD_MISMATCH: "Password and confirm password do not match",
  REQUIRED_FIELD_MISSING: "Please fill all required fields",
};
