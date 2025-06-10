const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
const API_VERSION = process.env.API_VERSION || "/api/v1";
const API_BASE_URL = `${BASE_URL}${API_VERSION}/athena`;
const BILL_ENDPOINTS = {
    CREATE_BILL: `${API_BASE_URL}/bill`,
    GET_BILL:(billId:string)=> `${API_BASE_URL}/bill/${billId}`,
    GET_ALL_BILL:(shopId:string)=> `${API_BASE_URL}/bill/all/${shopId}`,
};
export default BILL_ENDPOINTS;
