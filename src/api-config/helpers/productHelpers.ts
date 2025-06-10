import {
  axiosInstanceDelete,
  axiosInstanceGet,
  axiosInstancePatch,
  axiosInstancePost,
} from "../axiosInstance";

const createProduct = async (endpoint: string, payload: any,token:string) => {
  try {
    const response = await axiosInstancePost(endpoint, payload, token);
    //console.log("response", response);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching products");
  }
};

const updateProduct = async (endpoint: string,data:any, token: string) => {
  try {
    const response = await axiosInstancePatch(endpoint,data, token);
    //console.log("response", response);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching products");
  }
};

const deleteProduct = async (endpoint: string, token: string) => {
  try {
    const response = await axiosInstanceDelete(endpoint, token);
    //console.log("response", response);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching products");
  }
};

const getProduct = async (endpoint: string, token: string) => {
  try {
    const response = await axiosInstanceGet(endpoint, token);
    //console.log("response", response);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching products");
  }
};

const getAllProducts = async (endpoint: string, token: string) => {
  try {
    
    
    const response = await axiosInstanceGet(endpoint, token);
    //console.log("response", response);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching products");
  }
};

const getProductByCategory = async (endpoint: string, token: string) => {
  try {
    const response = await axiosInstanceGet(endpoint, token);
    //console.log("response", response);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching products");
  }
};

const searchProduct = async (endpoint: string, token: string) => {
  try {
    const response = await axiosInstanceGet(endpoint, token);
    //console.log("response", response);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching products");
  }
};

const updateProductAvailability = async (endpoint: string,data:any, token: string) => {
  try {
    const response = await axiosInstancePatch(endpoint,data, token);
    //console.log("response", response);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching products");
  }
};

const updateProductStock = async (endpoint: string,data:any, token: string) => {
  try {
    const response = await axiosInstancePatch(endpoint,data, token);
    //console.log("response", response);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching products");
  }
};

const updateProductSeller = async (endpoint: string,data:any,token: string) => {
  try {
    const response = await axiosInstancePatch(endpoint,data, token);
    //console.log("response", response);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching products");
  }
};
export const productHelpers = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
  getProductByCategory,
  searchProduct,
  updateProductAvailability,
  updateProductStock,
  updateProductSeller,
};
