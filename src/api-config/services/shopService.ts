import { useQuery } from "react-query";
import SHOP_ENDPOINTS from "../endpoints/shopEndpoints";
import { shopHelpers } from "../helpers/shopHelper";
import { queryKeys } from "../queryKeys";


export const useFetchAllCaterories = (shopId:string,token:string)=>{
    const { data, error, isLoading } = useQuery(
        queryKeys.getAllCategories(shopId),
        () => shopHelpers.getAllCategoriesByShopId(SHOP_ENDPOINTS.GET_ALL_CATEGORIES_BY_SHOP_ID(shopId),token),
        {
            enabled: !!shopId && !!token,
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000, // 5 minutes
        }
    );

    return { data, error, isLoading };
}