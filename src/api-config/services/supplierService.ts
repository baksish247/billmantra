import { useQuery } from "react-query";
import { queryKeys } from "../queryKeys";
import { sellerHelper } from "../helpers/sellerHelper";


const useFetchAllSellerData = (shopId:string,token:string)=>{
    const { data, error, isLoading } = useQuery(
        queryKeys.getAllShops(),
        () => sellerHelper.getAllSeller(shopId,token),
        {
            enabled: !!shopId && !!token,
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000, // 5 minutes
        }
    );

    return { data, error, isLoading };
}




export const supplierService = {
    useFetchAllSellerData,
}