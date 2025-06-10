import {
  axiosInstanceDelete,
  axiosInstanceGet,
  axiosInstancePatch,
  axiosInstancePost,
} from "../axiosInstance";

const createLending = async (endpoint: string, payload: any) => {
  try {
    const response = await axiosInstancePost(endpoint, payload, "");
    //console.log("response", response);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching lendings");
  }
};

const getLendingById = async (endpoint: string, token: string) => {
    try{
        const response = await axiosInstanceGet(endpoint, token);
        //console.log("response", response);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching lendings");
    }
};

const getLendingByShopId = async (endpoint: string, token: string) => {
    try{
        const response = await axiosInstanceGet(endpoint, token);
        //console.log("response", response);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching lendings");
    }
};

const getOutstandingLendingsByShopId = async (endpoint: string, token: string) => {
    try{
        const response = await axiosInstanceGet(endpoint, token);
        //console.log("response", response);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching lendings");
    }
};

const getLendingByCustomerId = async (endpoint: string, token: string) => {
    try{
        const response = await axiosInstanceGet(endpoint, token);
        //console.log("response", response);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching lendings");
    }
};

const getOutstandingLendingsByCustomerId = async (endpoint: string, token: string) => {
    try{
        const response = await axiosInstanceGet(endpoint, token);
        //console.log("response", response);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching lendings");
    }
};

const getUnpaidLendingsByShopId = async (endpoint: string, token: string) => {
    try{
        const response = await axiosInstanceGet(endpoint, token);
        //console.log("response", response);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching lendings");
    }
};

const updateLendingByLendingId = async (endpoint: string,data:any, token: string) => {
    try{
        const response = await axiosInstancePatch(endpoint,data, token);
        //console.log("response", response);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching lendings");
    }
};

const deleteLendingByLendingId = async (endpoint: string, token: string) => {
    try{
        const response = await axiosInstanceDelete(endpoint, token);
        //console.log("response", response);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching lendings");
    }
};

const addPaymentRecordToLending = async (endpoint: string, token: string) => {
    try{
        const response = await axiosInstancePost(endpoint, token);
        //console.log("response", response);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching lendings");
    }
};

const deletePaymentRecordFromLending = async (endpoint: string, token: string) => {
    try{
        const response = await axiosInstanceDelete(endpoint, token);
        //console.log("response", response);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching lendings");
    }
};

export const lendingHelpers = {
  createLending,
  getLendingById,
  getLendingByShopId,
  getOutstandingLendingsByShopId,
  getLendingByCustomerId,
  getOutstandingLendingsByCustomerId,
  getUnpaidLendingsByShopId,
  updateLendingByLendingId,
  deleteLendingByLendingId,
  addPaymentRecordToLending,
  deletePaymentRecordFromLending,
};