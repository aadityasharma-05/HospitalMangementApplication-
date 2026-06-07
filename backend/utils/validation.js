// Backend utilities - Validation helpers
import validator from "validator";
import { VALIDATION_RULES } from "./constants.js";

export const validateEmail = (email) => {
  return validator.isEmail(email);
};

export const validatePassword = (password) => {
  return password && password.length >= VALIDATION_RULES.PASSWORD_MIN_LENGTH;
};

export const validatePhoneNumber = (phone) => {
  return phone && phone.length === VALIDATION_RULES.PHONE_LENGTH && /^\d+$/.test(phone);
};

export const validateAadhaar = (aadhaar) => {
  return (
    aadhaar &&
    aadhaar.length === VALIDATION_RULES.AADHAAR_LENGTH &&
    /^\d+$/.test(aadhaar)
  );
};

export const validateDOB = (dob) => {
  const date = new Date(dob);
  return (
    !isNaN(date.getTime()) &&
    date < new Date() &&
    new Date().getFullYear() - date.getFullYear() >= 18
  );
};

export const validateUserInput = (userData) => {
  const errors = [];

  if (!userData.firstName || userData.firstName.length < VALIDATION_RULES.FIRST_NAME_MIN) {
    errors.push("First name must be at least 3 characters");
  }

  if (!userData.lastName || userData.lastName.length < VALIDATION_RULES.LAST_NAME_MIN) {
    errors.push("Last name must be at least 3 characters");
  }

  if (!validateEmail(userData.email)) {
    errors.push("Invalid email format");
  }

  if (!validatePhoneNumber(userData.phone)) {
    errors.push("Phone number must be 11 digits");
  }

  if (!validateAadhaar(userData.Aadhaar_NO)) {
    errors.push("Aadhaar must be 13 digits");
  }

  if (!validateDOB(userData.dob)) {
    errors.push("Must be at least 18 years old");
  }

  if (!validatePassword(userData.password)) {
    errors.push(`Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
