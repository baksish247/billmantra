import { axiosInstancePost } from "../axiosInstance";
import SUPPLIER_ENDPOINTS from "../endpoints/supplierEndpoints";

const createPurchase = async (shopId:string,payload: any,token:string) => {
  try {
    const response = await axiosInstancePost(SUPPLIER_ENDPOINTS?.CREATE_PURCHASES(shopId) , payload, token);
    //console.log("response", response);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching shops");
  }
};


export const purchaseHelper = {
  createPurchase,
};