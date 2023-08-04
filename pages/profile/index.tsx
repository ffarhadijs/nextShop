import { yupResolver } from "@hookform/resolvers/yup";
import { FormLabel, Stack, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { UpdateFormType } from "../../types/update.type";
import Layout from "../../components/layout/Layout";
import { useAlert } from "../../hooks/useAlert";
import Link from "next/link";

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
  const [showAlert, Alert] = useAlert();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<UpdateFormType>({
    resolver: yupResolver(schema),
    defaultValues: async () => {
      const resp = await fetch("/api/user");
      const data = await resp.json();
      return data.data;
    },
  });

  const onSubmit = async (formData: UpdateFormType) => {
    const response = await fetch("/api/auth/update", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    if (response.ok) {
      showAlert("Profile Info has been updated successfully", "success");
    } else {
      showAlert(data.message, "error");
    }
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
          <Button type="submit" variant="contained" className="bg-[#2196f3]" sx={{ marginTop: "30px" }}>
            submit
          </Button>
        </Stack>
      </Stack>

      <Alert />
    </>
  );
};

export default Profile;
