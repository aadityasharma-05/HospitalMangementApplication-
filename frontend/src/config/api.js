// Frontend API Configuration

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

export const API_ENDPOINTS = {
  // User endpoints
  USER_REGISTER: `${API_BASE_URL}/user/register`,
  USER_LOGIN: `${API_BASE_URL}/user/login`,
  USER_LOGOUT: `${API_BASE_URL}/user/logout`,
  GET_ALL_DOCTORS: `${API_BASE_URL}/user/doctors`,
  GET_DOCTOR: (id) => `${API_BASE_URL}/user/doctor/${id}`,

  // Appointment endpoints
  GET_APPOINTMENTS: `${API_BASE_URL}/appointment`,
  CREATE_APPOINTMENT: `${API_BASE_URL}/appointment`,
  UPDATE_APPOINTMENT: (id) => `${API_BASE_URL}/appointment/${id}`,
  DELETE_APPOINTMENT: (id) => `${API_BASE_URL}/appointment/${id}`,

  // Message endpoints
  SEND_MESSAGE: `${API_BASE_URL}/message/send`,
  GET_MESSAGES: `${API_BASE_URL}/message`,
  DELETE_MESSAGE: (id) => `${API_BASE_URL}/message/${id}`,
};

export { API_BASE_URL };
