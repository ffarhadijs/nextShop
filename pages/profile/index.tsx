import { yupResolver } from "@hookform/resolvers/yup";
import { FormLabel, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { UpdateFormType } from "../../types/update.type";
import { useUpdateProfile } from "../../hooks/auth/auth.hooks";
import LoadingButton from "@mui/lab/LoadingButton";
import { useQueryClient } from "react-query";
import toast from "react-hot-toast";

const schema = yup.object({
  name: yup
    .string()
    .min(3, "It should be at least 3 characters")
    .required("You shoulld input your name"),
  lastName: yup
    .string()
    .min(3, "It should be at least 3 characters")
    .required("You shoulld input your last name"),
  city: yup.string().required("You shoulld input your city"),
  country: yup.string().required("You should input your country"),
  address: yup.string().required("You shoulld input your address"),
  postalCode: yup
    .string()
    .required("You shoulld input your postal code")
    .length(10, "Postal code length should be 10"),
});
const Profile = () => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UpdateFormType>({
    resolver: yupResolver(schema),
    defaultValues: async () => {
      const resp = await fetch("/api/user");
      const data = await resp.json();
      return data.data;
    },
  });

  const { mutate, isLoading } = useUpdateProfile(
    watch("name"),
    watch("lastName"),
    watch("city"),
    watch("country"),
    watch("address"),
    watch("postalCode"),
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
        toast.success("User data updated successfully");
      },
      onError(error: any) {
        toast.error(error?.response?.data?.message);
      },
    }
  );

  const onSubmit = async () => {
    mutate();
  };

  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"left"}
        alignItems={"start"}
        p={0}
      >
        <Stack
          direction={"column"}
          alignItems={"end"}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          width={500}
          marginX={"auto"}
          marginY={4}
        >
          <Stack direction="column" width={"100%"} rowGap={2}>
            <Stack direction="column">
              <FormLabel>Name:</FormLabel>
              <TextField
                {...register("name")}
                size="small"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Stack>
            <Stack direction="column">
              <FormLabel>Last Name:</FormLabel>
              <TextField
                {...register("lastName")}
                size="small"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Stack>
            <Stack direction="column">
              <FormLabel>Email:</FormLabel>
              <TextField
                {...register("email")}
                size="small"
                disabled
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Stack>
            <Stack direction="column">
              <FormLabel>Country:</FormLabel>
              <TextField
                {...register("country")}
                size="small"
                error={!!errors.country}
                helperText={errors.country?.message}
              />
            </Stack>
            <Stack direction="column">
              <FormLabel>City:</FormLabel>
              <TextField
                {...register("city")}
                size="small"
                error={!!errors.city}
                helperText={errors.city?.message}
              />
            </Stack>
            <Stack direction="column">
              <FormLabel>Address:</FormLabel>
              <TextField
                {...register("address")}
                size="small"
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            </Stack>
            <Stack direction="column">
              <FormLabel>Postal Code:</FormLabel>
              <TextField
                {...register("postalCode")}
                size="small"
                type="number"
                error={!!errors.postalCode}
                helperText={errors.postalCode?.message}
              />
            </Stack>
          </Stack>
          <LoadingButton
            loading={isLoading}
            type="submit"
            variant="contained"
            className="bg-[#2196f3]"
            sx={{ marginTop: "30px" }}
          >
            submit
          </LoadingButton>
        </Stack>
      </Stack>
    </>
  );
};

export default Profile;
