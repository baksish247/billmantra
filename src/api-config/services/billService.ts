import { Payload } from "@/types";
import { useMutation } from "react-query";
import { billHelpers } from "../helpers/billHelper";
import BILL_ENDPOINTS from "../endpoints/billEndpoints";

type CreateBillPayload = {
  data: Payload;
  token: string;
};
export const useCreateBill = () => {
  return useMutation(({ data, token }:CreateBillPayload) =>
    billHelpers.createBill(BILL_ENDPOINTS.CREATE_BILL, data,token)
  );
};
