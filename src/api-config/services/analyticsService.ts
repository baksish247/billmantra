import { useQuery } from "react-query";
import { analyticsHelper } from "../helpers/analyticsHelper";
import { queryKeys } from "../queryKeys";

export const useOverview = (shopId: string, startDate: string, endDate: string, token: string) => {
    const { data, error, isLoading } = useQuery(
        queryKeys.getOverview(shopId, startDate, endDate),
        () => analyticsHelper.getOverview(shopId, startDate, endDate, token),
        {
            enabled: !!shopId && !!token,
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000, // 5 minutes
        }
    );
    return { data, error, isLoading };
};

export const usePaymentMode = (shopId: string, startDate: string, endDate: string, token: string) => {
    const { data, error, isLoading } = useQuery(
        queryKeys.getPaymentMode(shopId, startDate, endDate),
        () => analyticsHelper.getPaymentMode(shopId, startDate, endDate, token),
        {
            enabled: !!shopId && !!token,
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000,
        }
    );
    return { data, error, isLoading };
};

export const useTopSellingProducts = (shopId: string, startDate: string, endDate: string, token: string) => {
    const { data, error, isLoading } = useQuery(
        queryKeys.getTopSellingProducts(shopId, startDate, endDate),
        () => analyticsHelper.getTopSellingProducts(shopId, startDate, endDate, token),
        {
            enabled: !!shopId && !!token,
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000,
        }
    );
    return { data, error, isLoading };
};

export const useDailySales = (shopId: string, startDate: string, endDate: string, token: string) => {
    const { data, error, isLoading } = useQuery(
        queryKeys.getDailySales(shopId, startDate, endDate),
        () => analyticsHelper.getDailySales(shopId, startDate, endDate, token),
        {
            enabled: !!shopId && !!token,
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000,
        }
    );
    return { data, error, isLoading };
};

export const useMonthlySales = (shopId: string, startDate: string, endDate: string, token: string) => {
    const { data, error, isLoading } = useQuery(
        queryKeys.getMonthlySales(shopId, startDate, endDate),
        () => analyticsHelper.getMonthlySales(shopId, startDate, endDate, token),
        {
            enabled: !!shopId && !!token,
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000,
        }
    );
    return { data, error, isLoading };
};

export const useLendingOverview = (shopId: string, startDate: string, endDate: string, token: string) => {
    const { data, error, isLoading } = useQuery(
        queryKeys.getLendingOverview(shopId, startDate, endDate),
        () => analyticsHelper.getLendingOverview(shopId, startDate, endDate, token),
        {
            enabled: !!shopId && !!token,
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000,
        }
    );
    return { data, error, isLoading };
};