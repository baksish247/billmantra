import { axiosInstanceGet, axiosInstancePost } from "../axiosInstance";

const createBill = async (endpoint: string, payload: any,token:string) => {
  try {
    const response = await axiosInstancePost(endpoint, payload, token);
    //console.log("response", response);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching bill");
  }
};

const getBill = async (endpoint: string, token: string) => {
    try {
      const response = await axiosInstanceGet(endpoint, token);
      //console.log("response", response);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching bill");
    }
  };

const getAllBill = async (endpoint: string,payload: any, token: string) => {
    try {
      const response = await axiosInstancePost(endpoint, payload, token);
      //console.log("response", response);
      return response.data;
    }
    catch (error) {
      throw new Error("Error fetching bill");
    }
  };

export const billHelpers = {
  createBill,
  getBill,
};
