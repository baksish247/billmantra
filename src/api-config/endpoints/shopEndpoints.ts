const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
const API_VERSION = process.env.API_VERSION || "/api/v1";
const API_BASE_URL = `${BASE_URL}${API_VERSION}/ascendra`;
const SHOP_ENDPOINTS = {
  CREATE_SHOP: `${API_BASE_URL}/shop`,
  UPDATE_SHOP: (id: string) => `${API_BASE_URL}/shop/${id}`,
  GET_SHOP_BY_ID: (id: string) => `${API_BASE_URL}/shop/${id}`,
  GET_ALL_SHOP_CREDENTIALS: (shopId: string) =>
    `${API_BASE_URL}/shop/credentials/${shopId}`,
  GET_ALL_SHOPS: `${API_BASE_URL}/shop`,
  DELETE_SHOP: (id: string) => `${API_BASE_URL}/shop/${id}`,
  SHOP_LogIN: `${API_BASE_URL}/shop/login`,
  GET_ALL_CATEGORIES_BY_SHOP_ID: (shopId: string) =>
    `${API_BASE_URL}/shop/categories/${shopId}`,
};

export default SHOP_ENDPOINTS;
