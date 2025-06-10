const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
const API_VERSION = process.env.API_VERSION || "/api/v1";
const API_BASE_URL = `${BASE_URL}${API_VERSION}/analytics`;
const ANALYTICS_ENDPOINTS = {
    // GET_TOTAL_REVENUE_BY_SHOP_ID:(shopId:string)=> `${API_BASE_URL}/totalrevenue/${shopId}`,
    // GET_TOTAL_ORDERS_BY_SHOP_ID:(shopId:string)=> `${API_BASE_URL}/totalsales/${shopId}`,
    // GET_DAILY_SALES_BY_SHOP_ID:(shopId:string)=> `${API_BASE_URL}/dailysales/${shopId}`,
    GET_OVERVIEW:(shopId: string, startDate: string, endDate:string) => `${API_BASE_URL}/${shopId}/sales/overview?startDate=${startDate}&endDate=${endDate}`,
    GET_PAYMENT_MODE:(shopId:string, startDate:string, endDate:string)=> `${API_BASE_URL}/${shopId}/sales/payment-mode?startDate=${startDate}&endDate=${endDate}`,
    GET_TOP_SELLING_PRODUCTS:(shopId:string, startDate:string, endDate:string)=> `${API_BASE_URL}/${shopId}/products/top-selling?startDate=${startDate}&endDate=${endDate}`,
    GET_DAILY_SALES:(shopId:string, startDate:string, endDate:string)=> `${API_BASE_URL}/${shopId}/sales/daily?startDate=${startDate}&endDate=${endDate}`,
    GET_MONTHLY_SALES:(shopId:string, startDate:string, endDate:string)=> `${API_BASE_URL}/${shopId}/sales/monthly?startDate=${startDate}&endDate=${endDate}`,
    GET_LENDING_OVERVIEW:(shopId:string, startDate:string, endDate:string)=> `${API_BASE_URL}/${shopId}/lending/overview?startDate=${startDate}&endDate=${endDate}`,

};
export default ANALYTICS_ENDPOINTS;
