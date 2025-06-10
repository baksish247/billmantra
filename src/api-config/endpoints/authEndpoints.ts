const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || "/api/v1";
const API_BASE_URL = `${BASE_URL}${API_VERSION}`;
const AUTH_ENDPOINTS = {
    AUTH_LOGIN: `${API_BASE_URL}/ascendra/login`,
};
export default AUTH_ENDPOINTS;
