import { useMutation, useQuery } from "react-query";
import { queryKeys } from "../queryKeys";
import { lendingHelpers } from "../helpers/lendingHelper";
import LENDING_ENDPOINTS from "../endpoints/lendingEndpoints";

export const useFetchLendingsByShopId = (shopId:string,token:string)=>{
    
    const { data, error, isLoading } = useQuery(
        queryKeys.getProductByShopId(shopId),
        () => lendingHelpers.getLendingByShopId(LENDING_ENDPOINTS.GET_LENDING_BY_SHOP_ID(shopId),token),
        {
            enabled: !!shopId,
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000, // 5 minutes
        }
    );

    return { data, error, isLoading };
}

export const useFetchLendingById = (lendingId:string,token:string)=>{
    
    const { data, error, isLoading } = useQuery(
        queryKeys.getLendingById(lendingId),
        () => lendingHelpers.getLendingById(LENDING_ENDPOINTS.GET_LENDING_BY_ID(lendingId),token),
        {
            enabled: !!lendingId,
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000, // 5 minutes
        }
    );

    return { data, error, isLoading };
}

export const useFetchLendingByCustomerId = (customerId:string,shopId:string,token:string)=>{
    
    const { data, error, isLoading } = useQuery(
        queryKeys.getLendingByShopIdCustomerId(shopId,customerId),
        () => lendingHelpers.getLendingByCustomerId(LENDING_ENDPOINTS.GET_LENDING_BY_CUSTOMER_ID(shopId,customerId),token),
        {
            enabled: !!customerId || !!shopId,
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000, // 5 minutes
        }
    );

    return { data, error, isLoading };
}

export const useUpdateLending = () => {
  return useMutation(({lendingId, data, token }:any) =>
    lendingHelpers.updateLendingByLendingId(LENDING_ENDPOINTS.UPDATE_LENDING_BY_LENDING_ID(lendingId), data, token)
  );
};
