import { Button, FormLabel, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LoginFormType } from "../types/login.type";
import Layout from "../components/layout/Layout";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { verifyToken } from "../utils/verifyToken";
import { useRouter } from "next/router";
import { useState } from "react";
import { alertType, useAlert } from "../hooks/useAlert";

const schema = yup
  .object({
    email: yup
      .string()
      .required("You should input email address.")
      .email("Email address is not valid."),
    password: yup
      .string()
      .required("You should input email address.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
        "Must Contain 6 Characters, One Uppercase, One Lowercase and One Number."
      ),
  })
  .required();

const Login = (props: any) => {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: yupResolver(schema),
  });
  const [showAlert, Alert] = useAlert();
  const onSubmit = async (formData: LoginFormType) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (response.ok) {
      push("/");
      showAlert("Logged in successfully", alertType.success);
    } else {
      showAlert(data.message, alertType.error);
    }
  };

  return (
    <>
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
          <FormLabel>Email:</FormLabel>
          <TextField
            placeholder="Enter your email address"
            {...register("email")}
          />
          <Typography variant="caption" color="red">
            {errors.email?.message}
          </Typography>
        </Stack>
        <Stack direction="column">
          <FormLabel>Password:</FormLabel>
          <TextField
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />
          <Typography variant="caption" color="red">
            {errors.password?.message}
          </Typography>
        </Stack>
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
        <Typography>
          Dont you have an account? click <Link href="/signup"> here </Link>
        </Typography>
      </Stack>
      <Alert />
    </>
  );
};

export default Login;

export async function getServerSideProps(context: any) {
  const { token } = context.req.cookies;
  const secretKey = process.env.SECRET_KEY;

  const result = verifyToken(token, secretKey!);

  if (result) {
    return { redirect: { destination: "/dashboard", permanent: false } };
  }
  return { props: { result } };
}
