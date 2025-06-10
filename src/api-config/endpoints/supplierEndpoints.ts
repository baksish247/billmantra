const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
const API_VERSION = process.env.API_VERSION || "/api/v1";
const API_BASE_URL = `${BASE_URL}${API_VERSION}/athena`;
const SUPPLIER_ENDPOINTS = {
    CREATE_SUPPLIER:(shopId:string)=> `${API_BASE_URL}/seller/${shopId}`,
    GET_SUPPLIER_BY_SHOP_ID: (shopId: string, pageNo: string, limit:string) => `${API_BASE_URL}/seller/shop/${shopId}?page=${pageNo}&limit=${limit}`,
    GET_ALL_SUPPLIERS_BY_SHOP_ID: (shopId: string) => `${API_BASE_URL}/seller/shop/${shopId}/all`,
    // GET_ALL_SUPPLIERS: (shopId: string) => `${API_BASE_URL}/seller/${shopId}`,
    SEARCH_SUPPLIER:(shopId:string,query:any)=> `${API_BASE_URL}/seller/shop/${shopId}/search?query=${query}`,
    CREATE_PURCHASES :(shopId:string) =>`${API_BASE_URL}/purchase/${shopId}`,
    GET_PURCHASES_BY_SHOP_AND_SELLER: (shopId:string,sellerId:string)=> `${API_BASE_URL}/purchases?shop_id=${shopId}&seller_id=${sellerId}`,
    GET_ALL_SUPPLIERS: (shopId: string) => `${API_BASE_URL}/seller/${shopId}`,
};

export default SUPPLIER_ENDPOINTS;
