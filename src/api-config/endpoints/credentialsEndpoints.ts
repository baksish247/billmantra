const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
const API_VERSION = process.env.API_VERSION || "/api/v1";
const API_BASE_URL = `${BASE_URL}${API_VERSION}/ascendra`;
const CREDENTIAL_ENDPOINTS = {
    CREATE_CREDENTIAL: (shopId:string)=> `${API_BASE_URL}/credential/${shopId}`,
    UPDATE_CREDENTIAL: (shopId:string, id: string)=> `${API_BASE_URL}/credential/${shopId}/${id}`,    
    GET_CREDENTIAL: (shopId:string, id: string)=> `${API_BASE_URL}/credential/${shopId}/${id}`,
    DELETE_CREDENTIAL: (shopId:string, id: string)=> `${API_BASE_URL}/credential/${shopId}/${id}`,
};
export default CREDENTIAL_ENDPOINTS;
