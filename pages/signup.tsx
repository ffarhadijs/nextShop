import { Button, FormLabel, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Layout from "../components/layout/Layout";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SignupFormType } from "../types/signup.type";
import { verifyToken } from "../utils/verifyToken";
import { useRouter } from "next/router";
import { alertType, useAlert } from "../hooks/useAlert";

const schema = yup
  .object({
    email: yup
      .string()
      .required("You should input email address.")
      .email("Email address is not valid."),
    name: yup
      .string()
      .required("You should input your name.")
      .min(3, "Your name should at least 3 characters"),
    password: yup
      .string()
      .required("You should input your password.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
        "Must Contain 6 Characters, One Uppercase, One Lowercase and One Number."
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), undefined], "Passwords must match")
      .required("You should input your confirm password."),
  })
  .required();

const Signup = () => {
  const { push } = useRouter();
  const [showAlert, Alert] = useAlert();
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
  const onSubmit = async (formData: SignupFormType) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (response.ok) {
      push("/login");
      showAlert(data.message, alertType.success);
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
          <Link href="/login"> here </Link>
        </Typography>
      </Stack>
      <Alert />
    </>
  );
};

export default Signup;

export async function getServerSideProps(context: any) {
  const { token } = context.req.cookies;
  const secretKey = process.env.SECRET_KEY;

  const result = verifyToken(token, secretKey!);

  if (result) {
    return {
      redirect: { destination: "/dashboard", permanent: false },
    };
  }
  return { props: { result } };
}
