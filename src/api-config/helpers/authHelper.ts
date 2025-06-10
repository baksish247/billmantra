
import { axiosInstancePost } from "../axiosInstance";
import AUTH_ENDPOINTS from "../endpoints/authEndpoints";

const authLogin = async (payload:any) => {
  try {
    console.log(AUTH_ENDPOINTS.AUTH_LOGIN);
    
    const response = await axiosInstancePost(AUTH_ENDPOINTS.AUTH_LOGIN, payload, "");
    //console.log("response", response);
    return response.data;

  } catch (error) {
    throw new Error("Error fetching auth");
  }
}



export const authHelpers = {
    authLogin,
}