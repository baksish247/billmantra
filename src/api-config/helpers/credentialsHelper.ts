import { axiosInstanceDelete, axiosInstanceGet, axiosInstancePatch, axiosInstancePost } from "../axiosInstance";

const createCredential = async (endpoint: string, payload: any) => {
  try {
    const response = await axiosInstancePost(endpoint, payload, "");
    //console.log("response", response);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching credentials");
  }
};

const updateCredential = async (endpoint: string, token: string) => {
    try {
      const response = await axiosInstancePatch(endpoint,null, token);
      //console.log("response", response);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching credentials");
    }
  };

const getCredential = async (endpoint: string, token: string) => {
    try {
      const response = await axiosInstanceGet(endpoint, token);
      //console.log("response", response);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching credentials");
    }
  };
  const deleteCredential = async (endpoint: string, token: string) => {
    try {
      const response = await axiosInstanceDelete(endpoint, token);
      //console.log("response", response);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching credentials");
    }
  };

export const credHelpers = {
  createCredential,
  updateCredential,
  getCredential,
  deleteCredential,
};
