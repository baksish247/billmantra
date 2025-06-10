import { useQuery, useMutation } from 'react-query';
import PRODUCT_ENDPOINTS from '../endpoints/productEndpoints';
import { queryKeys } from '../queryKeys';
import { productHelpers } from '../helpers/productHelpers';

type CreateProductPayload = {
  shopId: string;
  data: any;
  token: string;
};
type UpdateProductPayload = {
  shopId: string;
  productId: string;
  data: any;
  token: string;
};
type DeleteProductPayload = {
  shopId: string;
  productId: string;
  token: string;
};

export const useCreateProduct = () => {
  return useMutation(({ shopId, data, token }: CreateProductPayload) =>
    productHelpers.createProduct(PRODUCT_ENDPOINTS.CREATE_PRODUCT(shopId), data,token)
  );
};
export const useUpdateProduct = () => {
  return useMutation(({ shopId,productId, data, token }: UpdateProductPayload) =>
    productHelpers.updateProduct(PRODUCT_ENDPOINTS.UPDATE_PRODUCT(shopId,productId), data,token)
  );
};
export const useDeleteProduct =()=>{
  return useMutation(({ shopId,productId, token }: DeleteProductPayload) =>
    productHelpers.deleteProduct(PRODUCT_ENDPOINTS.DELETE_PRODUCT(shopId,productId),token)
  );
};

export const useFetchAllProducts = (shopId:string,token:string)=>{
    
    const { data, error, isLoading } = useQuery(
        queryKeys.getAllProducts(shopId),
        () => productHelpers.getAllProducts(PRODUCT_ENDPOINTS.GET_ALL_PRODUCTS(shopId),token),
        {
            enabled: !!shopId,
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000, // 5 minutes
        }
    );

    return { data, error, isLoading };
}

export const useFetchCategoryProducts = (shopId:string,category:string,token:string)=>{
    
    const { data, error, isLoading } = useQuery(
        queryKeys.getProductByCategory(category),
        () => productHelpers.getProductByCategory(PRODUCT_ENDPOINTS.GET_PRODUCT_BY_CATEGORY(shopId,category),token),
        {
            enabled: !!category,
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000, // 5 minutes
        }
    );

    return { data, error, isLoading };
}

export const useFetchProductBySearchTerm = (shopId:string,searchTerm:string,token: string) => {

        const { data, error, isLoading } = useQuery(
        queryKeys.getProductByCategory('all',searchTerm),
        () => productHelpers.searchProduct(PRODUCT_ENDPOINTS.SEARCH_PRODUCT(shopId,searchTerm.trim()),token),
        {
            enabled: !! searchTerm,
            staleTime: 5 * 60 * 1000, // 5 minutes
        }
    );

    return { data, error, isLoading };
}