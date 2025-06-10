const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || "/api/v1";
const PRODUCT_API_BASE_URL = `${BASE_URL}${API_VERSION}/athena`;
const PRODUCT_ENDPOINTS = {
  CREATE_PRODUCT: (shopId:string)=> `${PRODUCT_API_BASE_URL}/product/${shopId}`,
  UPDATE_PRODUCT: (shopId:string,id: string) => `${PRODUCT_API_BASE_URL}/product/${shopId}/${id}`,
  DELETE_PRODUCT: (shopId:string,id: string) => `${PRODUCT_API_BASE_URL}/product/${shopId}/${id}`,
  GET_PRODUCT_BY_ID: (id: string) => `${PRODUCT_API_BASE_URL}/product/${id}`,
  GET_ALL_PRODUCTS: (shopId:string)=> `${PRODUCT_API_BASE_URL}/product/all/${shopId}`,
  GET_PRODUCT_BY_CATEGORY: (shopId:string, category:string)=> `${PRODUCT_API_BASE_URL}/product/${shopId}/category/${category}`,
  SEARCH_PRODUCT:(shopId:string, productName:string)=> `${PRODUCT_API_BASE_URL}/product/${shopId}/search/${productName}`,
  UPDATE_PRODUCT_AVAILABILITY: (shopId:string,id: string) => `${PRODUCT_API_BASE_URL}/product/${shopId}/${id}/availability`,
  UPDATE_PRODUCT_STOCK: (shopId:string,id: string) => `${PRODUCT_API_BASE_URL}/product/${shopId}/${id}/stock`,
  UPDATE_PRODUCT_SELLER: (shopId:string,id: string) => `${PRODUCT_API_BASE_URL}/product/${shopId}/${id}/seller`,
};
export default PRODUCT_ENDPOINTS;
