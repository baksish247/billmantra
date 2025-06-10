import {
  axiosInstanceDelete,
  axiosInstanceGet,
  axiosInstancePatch,
  axiosInstancePost,
} from "../axiosInstance";

const createShop = async (endpoint: string, payload: any) => {
  try {
    const response = await axiosInstancePost(endpoint, payload, "");
    //console.log("response", response);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching shops");
  }
};

const updateShop = async (endpoint: string,data:any, token: string) => {
  try {
    const response = await axiosInstancePatch(endpoint,data, token);
    //console.log("response", response);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching shops");
  }
};

const getShop = async (endpoint: string, token: string) => {
  try {
    const response = await axiosInstanceGet(endpoint, token);
    //console.log("response", response);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching shops");
  }
};

const getShopById = async (endpoint: string, token: string) => {
  try {
    const response = await axiosInstanceGet(endpoint, token);
    //console.log("response", response);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching shops");
  }
};

const getAllShopCredential = async (endpoint: string, token: string) => {
  try {
    const response = await axiosInstanceGet(endpoint, token);
    //console.log("response", response);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching shops");
  }
};

const getAllShop = async (endpoint: string, token: string) => {
  try {
    const response = await axiosInstanceGet(endpoint, token);
    //console.log("response", response);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching shops");
  }
};


const deleteShop = async (endpoint: string, token: string) => {
  try {
    const response = await axiosInstanceDelete(endpoint, token);
    //console.log("response", response);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching shops");
  }
};

const ShopLogin = async (endpoint: string, payload: any) => {
  try {
    const response = await axiosInstancePost(endpoint, payload, "");
    //console.log("response", response);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching shops");
  }
};

const getAllCategoriesByShopId = async (endpoint: string, token: string) => {
  try {
    const response = await axiosInstanceGet(endpoint, token);
    //console.log("response", response);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching shops"); 
  }
};

export const shopHelpers = {
  createShop,
  updateShop,
  getShopById,
  getAllShopCredential,
  getAllShop,
  deleteShop,
  ShopLogin,
  getAllCategoriesByShopId
};
