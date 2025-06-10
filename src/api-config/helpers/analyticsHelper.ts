import { get } from "http";
import { axiosInstanceGet } from "../axiosInstance";
import ANALYTICS_ENDPOINTS from "../endpoints/analyticsEndpoints";

const getOverview = async (shopId: string, startDate: string, endDate: string, token: string) => {
  try {
    const response = await axiosInstanceGet(
      ANALYTICS_ENDPOINTS.GET_OVERVIEW(shopId, startDate, endDate),
      token
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching overview");
  }
};

const getPaymentMode = async (shopId: string, startDate: string, endDate: string, token: string) => {
  try {
    const response = await axiosInstanceGet(
      ANALYTICS_ENDPOINTS.GET_PAYMENT_MODE(shopId, startDate, endDate),
      token
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching payment mode data");
  }
};

const getTopSellingProducts = async (shopId: string, startDate: string, endDate: string, token: string) => {
  try {
    const response = await axiosInstanceGet(
      ANALYTICS_ENDPOINTS.GET_TOP_SELLING_PRODUCTS(shopId, startDate, endDate),
      token
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching top selling products");
  }
};

const getDailySales = async (shopId: string, startDate: string, endDate: string, token: string) => {
  try {
    const response = await axiosInstanceGet(
      ANALYTICS_ENDPOINTS.GET_DAILY_SALES(shopId, startDate, endDate),
      token
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching daily sales");
  }
};

const getMonthlySales = async (shopId: string, startDate: string, endDate: string, token: string) => {
  try {
    const response = await axiosInstanceGet(
      ANALYTICS_ENDPOINTS.GET_MONTHLY_SALES(shopId, startDate, endDate),
      token
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching monthly sales");
  }
};

const getLendingOverview = async (shopId: string, startDate: string, endDate: string, token: string) => {
  try {
    const response = await axiosInstanceGet(
      ANALYTICS_ENDPOINTS.GET_LENDING_OVERVIEW(shopId, startDate, endDate),
      token
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching lending overview");
  }
};

export const analyticsHelper = {
  getOverview,
  getPaymentMode,
  getTopSellingProducts,
  getDailySales,
  getMonthlySales,
  getLendingOverview
};
