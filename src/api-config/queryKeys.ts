import { get } from "http";
import { keyNames } from "./queryKeyNames";
export const queryKeys = {
  getAllProducts: (shopId: string) => [keyNames.getAllProducts, shopId],
  getProductById: (id: string) => [keyNames.getProductById, id],
  createProduct: () => [keyNames.createProduct],
  updateProduct: (id: string) => [keyNames.updateProduct, id],
  deleteProduct: (id: string) => [keyNames.deleteProduct, id],
  getAllCategories: (id: string) => [keyNames.getAllCategories, id],
  getProductByCategory: (category: string, searchTerm?: string) => [
    keyNames.getProductByCategory,
    category,
    searchTerm?.trim(),
  ],
  getProductByShopId: (shopId: string) => [keyNames.getProductByShopId, shopId],
  searchProduct: (productName: string) => [keyNames.searchProduct, productName],
  updateProductAvailability: (id: string) => [
    keyNames.updateProductAvailability,
    id,
  ],
  getAllLendings: (shopId: string) => [keyNames.getAllLendings, shopId],
  getLendingById: (id: string) => [keyNames.getLendingById, id],
  getLendingByShopIdCustomerId: (shopId: string, customerId: string) => [
    keyNames.getLendingByShopIdCustomerId,
    shopId,
    customerId,
  ],
  getAllShops: () => [keyNames.getAllShops],
  getShopById: (id: string) => [keyNames.getShopById, id],
  getOverview: (shopId: string, startDate:string, endDate:string) => [keyNames.getOverview, shopId, startDate, endDate],
  getPaymentMode: (shopId: string, startDate:string, endDate:string) => [keyNames.getPaymentMode, shopId, startDate, endDate],
  getTopSellingProducts: (shopId: string, startDate:string, endDate:string) => [keyNames.getTopSellingProducts, shopId, startDate, endDate],
  getDailySales: (shopId: string, startDate:string, endDate:string) => [keyNames.getDailySales, shopId, startDate, endDate],
  getMonthlySales: (shopId: string, startDate:string, endDate:string) => [keyNames.getMonthlySales, shopId, startDate, endDate],
  getLendingOverview: (shopId: string, startDate:string, endDate:string) => [keyNames.getLendingOverview, shopId, startDate, endDate],
};
