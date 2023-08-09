import axios from "axios";
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "react-query";
import { QueryKey } from "../../enums/queryKey";

export const useSignin = (
  email: string,
  password: string,
  options?: UseMutationOptions<unknown, unknown, void, unknown>
) => {
  return useMutation({
    mutationFn: () => axios.post("/api/auth/login", { email, password }),
    ...options,
  });
};

export const useSignup = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  isAdmin: boolean,
  options?: UseMutationOptions<unknown, unknown, void, unknown>
) => {
  return useMutation({
    mutationFn: () =>
      axios.post("/api/auth/signup", {
        name,
        email,
        password,
        confirmPassword,
        isAdmin,
      }),
    ...options,
  });
};

export const useUpdateProfile = (
  name: string,
  lastName: string,
  city: string,
  country: string,
  address: string,
  postalCode: number,
  options?: UseMutationOptions<unknown, unknown, void, unknown>
) => {
  return useMutation({
    mutationFn: () =>
      axios.post("/api/auth/update", {
        name,
        lastName,
        city,
        country,
        address,
        postalCode,
      }),
    ...options,
  });
};

// export const useGetUser = (options?: UseQueryOptions) => {
//   return useQuery<any, any>({
//     queryKey: [QueryKey.GetUser],
//     queryFn: () => axios.get("/api/auth/getUser"),
//     onError: (error: any) => {
//       notifications.show({
//         color: "red",
//         title: "Error",
//         message: error?.response?.data?.message,
//       });
//     },
//     refetchOnMount: "always",
//     ...options,
//   });
// };

// export const useChangePassword = (
//   oldPassword: string,
//   newPassword: string,
//   confirmPassword: string,
//   options?: UseMutationOptions<unknown, unknown, void, unknown>
// ) => {
//   return useMutation({
//     mutationFn: () =>
//       axios.patch("/api/auth/change-password", {
//         oldPassword,
//         newPassword,
//         confirmPassword,
//       }),
//     onSuccess: () => {
//       notifications.show({
//         color: "green",
//         title: "Change Password",
//         message: "Password has been changed successfully",
//       });
//     },
//     onError(error: any) {
//       notifications.show({
//         color: "red",
//         title: "Error",
//         message: error?.response?.data?.message,
//       });
//     },
//     ...options,
//   });
// };

export const useSignout = (options?: UseQueryOptions) => {
  return useQuery({
    queryKey: [QueryKey.LogOut],
    queryFn: () => axios.get("/api/auth/logout"),
    ...options,
  });
};
