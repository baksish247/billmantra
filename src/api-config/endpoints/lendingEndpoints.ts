const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || "/api/v1";
const PRODUCT_API_BASE_URL = `${BASE_URL}${API_VERSION}/athena`;
const LENDING_ENDPOINTS = {
    CREATE_LENDING: () => `${PRODUCT_API_BASE_URL}/lending`,
    GET_LENDING_BY_ID: (id: string) => `${PRODUCT_API_BASE_URL}/lending/${id}`,
    GET_LENDING_BY_SHOP_ID: (shopId: string) => `${PRODUCT_API_BASE_URL}/lending/shop/${shopId}`,
    GET_OUTSTANDING_LENDING_BY_SHOP_ID: (shopId: string) => `${PRODUCT_API_BASE_URL}/lending/shop/${shopId}/outstanding`,
    GET_LENDING_BY_CUSTOMER_ID: (customerId: string,shopId:string) => `${PRODUCT_API_BASE_URL}/lending/customer/${customerId}/${shopId}`,
    GET_OUTSTANDING_LENDING_BY_CUSTOMER_ID: (customerId: string,shopId: string) => `${PRODUCT_API_BASE_URL}/lending/customer/${customerId}/${shopId}/outstanding`,
    GET_UNPAID_LENDING_BY_SHOP_ID: (shopId: string) => `${PRODUCT_API_BASE_URL}/lending/unpaid/${shopId}`,
    UPDATE_LENDING_BY_LENDING_ID: (lendingId: string) => `${PRODUCT_API_BASE_URL}/lending/${lendingId}`,
    DELETE_LENDING_BY_LENDING_ID: (lendingId: string) => `${PRODUCT_API_BASE_URL}/lending/${lendingId}`,
    ADD_PAYMENT_RECORD_TO_LENDING: (lendingId: string) => `${PRODUCT_API_BASE_URL}/lending/${lendingId}/payment`,
    DELETE_PAYMENT_RECORD_FROM_LENDING: (lendingId: string, paymentId: string) => `${PRODUCT_API_BASE_URL}/lending/${lendingId}/payment/${paymentId}`,

};
export default LENDING_ENDPOINTS;