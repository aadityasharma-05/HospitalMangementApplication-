// Dashboard API Configuration

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

export const API_ENDPOINTS = {
  // User endpoints
  USER_LOGIN: `${API_BASE_URL}/user/login`,
  USER_LOGOUT: `${API_BASE_URL}/user/logout`,
  GET_ALL_USERS: `${API_BASE_URL}/user/admin/users`,
  GET_ALL_DOCTORS: `${API_BASE_URL}/user/doctors`,
  ADD_DOCTOR: `${API_BASE_URL}/user/doctor/addnew`,
  ADD_ADMIN: `${API_BASE_URL}/user/admin/addnew`,

  // Appointment endpoints
  GET_APPOINTMENTS: `${API_BASE_URL}/appointment`,
  UPDATE_APPOINTMENT: (id) => `${API_BASE_URL}/appointment/${id}`,
  DELETE_APPOINTMENT: (id) => `${API_BASE_URL}/appointment/${id}`,

  // Message endpoints
  GET_MESSAGES: `${API_BASE_URL}/message`,
  DELETE_MESSAGE: (id) => `${API_BASE_URL}/message/${id}`,
};

export { API_BASE_URL };
