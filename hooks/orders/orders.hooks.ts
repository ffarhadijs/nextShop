import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "react-query";
import { QueryKey } from "../../enums/queryKey";
import axios from "axios";

export function useAllOrders(options?: UseQueryOptions) {
  return useQuery<any, any>({
    queryKey: QueryKey.AllOrders,
    queryFn: () => axios.get("/api/order/allOrders"),
    ...options,
  });
}

export function useOrdersList(options?: UseQueryOptions) {
  return useQuery<any, any>({
    queryKey: QueryKey.OrdersList,
    queryFn: () => axios.get("/api/order/ordersList"),
    ...options,
  });
}

export function useCreateOrder(
  orderItems: any,
  shippingAddress: any,
  itemsPrice: any,
  shippingPrice: any,
  taxPrice: any,
  totalPrice: any,
  options?: UseMutationOptions
) {
  return useMutation({
    mutationFn: () =>
      axios.post("/api/order", {
        orderItems,
        shippingAddress,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      }),
    ...options,
  });
}
