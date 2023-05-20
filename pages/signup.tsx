import { Button, FormLabel, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Layout from "../components/layout/Layout";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SignupFormType } from "../types/signup.type";

const schema = yup
  .object({
    email: yup
      .string()
      .required("You should input email address.")
      .email("Email address is not valid."),
    name: yup
      .string()
      .required("You should input email address.")
      .min(3, "Your name should at least 3 characters"),
    password: yup
      .string()
      .required("You should input email address.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
        "Must Contain 6 Characters, One Uppercase, One Lowercase and One Number."
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), undefined], "Passwords must match"),
  })
  .required();

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      isAdmin: false,
    },
  });
  const onSubmit = async (data: SignupFormType) => {
    try {
      await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <Stack
        maxWidth={600}
        marginX={"auto"}
        marginTop={6}
        direction={"column"}
        component="form"
        rowGap={2}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack direction="column" width={"100%"}>
          <FormLabel>Name:</FormLabel>
          <TextField {...register("name")} />
          <Typography variant="caption" color="red">
            {errors.name?.message}
          </Typography>
        </Stack>
        <Stack direction="column" width={"100%"}>
          <FormLabel>Email:</FormLabel>
          <TextField {...register("email")} />
          <Typography variant="caption" color="red">
            {errors.email?.message}
          </Typography>
        </Stack>
        <Stack direction="column">
          <FormLabel>Password:</FormLabel>
          <TextField type="password" {...register("password")} />
          <Typography variant="caption" color="red">
            {errors.password?.message}
          </Typography>
        </Stack>
        <Stack direction="column">
          <FormLabel>Confirm Password:</FormLabel>
          <TextField type="password" {...register("confirmPassword")} />
          <Typography variant="caption" color="red">
            {errors.confirmPassword?.message}
          </Typography>
        </Stack>
        <Button variant="contained" color="primary" type="submit">
          Signup
        </Button>
        <Typography>
          Do you have any account already? click{" "}
          <Link href="/signup"> here </Link>
        </Typography>
      </Stack>
    </Layout>
  );
};

export default Login;
