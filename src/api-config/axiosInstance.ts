import axios from "axios";
import { XoupError } from "./types";


export const axiosInstancePost = async (
  endpoint: string,
  payload?: Object,
  token?: string
) => {
  try {
    const response = await axios.post(endpoint, payload, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    return response.data;
  } catch (error: any) {
    if(error?.response?.data?.success == false){
      const customError: XoupError = {
        type : "error",
        status: error.response?.status || 500,
        message: error.response?.data?.error || error.message || 'An error occurred',
      };
      return customError;
    }
  }
};

export const axiosInstanceGet = async (endpoint: string, token: string) => {
  try {
    
    const response = await axios.get(endpoint, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    return response.data;
  } catch (error: any) {
    if(error?.response?.data?.success == false){
      const customError: XoupError = {
        type : "error",
        status: error.response?.status || 500,
        message: error.response?.data?.error || error.message || 'An error occurred',
      };
      return customError;
    }
  }
};

export const axiosInstancePut = async (endpoint: string, payload: any, token: string) => {
  try {
    const response = await axios.put(
      endpoint,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if(error?.response?.data?.success == false){
      const customError: XoupError = {
        type : "error",
        status: error.response?.status || 500,
        message: error.response?.data?.error || error.message || 'An error occurred',
      };
      return customError;
    }
  }
};

export const axiosInstancePatch = async (endpoint: string,data:any, token: string) => {
  try {

    const response = await axios.patch(endpoint,data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    return response.data;
  } catch (error: any) {
    if(error?.response?.data?.success == false){
      const customError: XoupError = {
        type : "error",
        status: error.response?.status || 500,
        message: error.response?.data?.error || error.message || 'An error occurred',
      };
      return customError;
    }
  }
};



export const axiosInstanceDelete = async (endpoint: string, token: string) => {
  try {
    const response = await axios.delete(
      endpoint,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if(error?.response?.data?.success == false){
      const customError: XoupError = {
        type : "error",
        status: error.response?.status || 500,
        message: error.response?.data?.error || error.message || 'An error occurred',
      };
      return customError;
    }
  }
};

export const ReportAxiosInstanceGet = async (endpoint: string) => {
  try {
    const response = await axios.get(endpoint, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": `${process.env.NEXT_PUBLIC_DUMPER_API_KEY}`
      },
    });
    return response.data;
  } catch (error: any) {
    if(error?.response?.data?.success == false){
      const customError: XoupError = {
        type : "error",
        status: error.response?.status || 500,
        message: error.response?.data?.error || error.message || 'An error occurred',
      };
      return customError;
    }
  }
};

