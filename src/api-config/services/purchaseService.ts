import { useMutation } from "react-query";
import { purchaseHelper } from "../helpers/purchaseHelper";

type CreatePurchasePayload={
    shopId: string;
    data: any; // Define a more specific type based on your data structure
    token: string;
}
export const useCreatePurchase = () => {
  return useMutation(({ shopId, data, token }: CreatePurchasePayload) =>
    purchaseHelper.createPurchase(shopId, data,token)
  );
};