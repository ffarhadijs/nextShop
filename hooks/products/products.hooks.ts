import axios from "axios";
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "react-query";
import { QueryKey } from "../../enums/queryKey";

export function useAddProduct(
  data: any,
  options?: UseMutationOptions<unknown, unknown, void, unknown>
) {
  return useMutation({
    mutationFn: () => axios.post("/api/products/addProduct", data),
    ...options,
  });
}

export function useUpdateProduct(
  data: any,
  id: string,
  options?: UseMutationOptions<unknown, unknown, void, unknown>
) {
  return useMutation({
    mutationFn: () => axios.post(`/api/products/editProduct/${id}`, data),
    ...options,
  });
}

export function useDeleteProduct(
  id: string,
  options?: UseMutationOptions<unknown, unknown, void, unknown>
) {
  return useMutation({
    mutationFn: () => axios.delete(`/api/products/deleteProduct/${id}`),
    ...options,
  });
}

export function useGetProductsList(options?: UseQueryOptions) {
  return useQuery<any,any>({
    queryKey: QueryKey.ProductsList,
    queryFn: () => axios.get(`/api/products`),
    ...options,
  });
}

export function useGetProduct(id: string, options?: UseQueryOptions) {
  return useQuery<any,any>({
    queryKey: QueryKey.Product,
    queryFn: () => axios.get(`/api/products/getProduct/${id}`),
    ...options,
  });
}
