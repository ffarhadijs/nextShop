import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "react-query";
import { QueryKey } from "../../enums/queryKey";
import axios from "axios";

export function useGetUsersList(options?: UseQueryOptions) {
  return useQuery({
    queryKey: QueryKey.UsersList,
    queryFn: () => axios.get(`/api/user/usersList`),
    ...options,
  });
}

export function useDeleteUser(id: string, options?: UseMutationOptions) {
  return useMutation({
    mutationFn: () => axios.delete(`/api/user/deleteUser/${id}`),
    ...options,
  });
}

export function useGetUser(options?: UseQueryOptions) {
  return useQuery<any, any>({
    queryKey: QueryKey.getUser,
    queryFn: () => axios.get("/api/user"),
    ...options,
  });
}
