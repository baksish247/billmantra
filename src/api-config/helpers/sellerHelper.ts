import { axiosInstanceGet } from "../axiosInstance";
import SUPPLIER_ENDPOINTS from "../endpoints/supplierEndpoints";

const getAllSeller = async (shopId:string, token: string) => {
  try {
    const response = await axiosInstanceGet(SUPPLIER_ENDPOINTS.GET_ALL_SUPPLIERS(shopId), token);
    //console.log("response", response);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching sellers");
  }
};


export const sellerHelper = {
  getAllSeller: getAllSeller,
}