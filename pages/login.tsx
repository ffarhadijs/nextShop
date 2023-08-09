import { FormLabel, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LoginFormType } from "../types/login.type";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { verifyToken } from "../utils/verifyToken";
import { alertType, useAlert } from "../hooks/useAlert";
import { useSignin } from "../hooks/auth/auth.hooks";
import LoadingButton from "@mui/lab/LoadingButton";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";

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
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: yupResolver(schema),
  });
  const [showAlert, Alert] = useAlert();

  const { mutate, isLoading } = useSignin(
    getValues().email,
    getValues().password,
    {
      onSuccess: () => {
        showAlert("User signed in successfully!", alertType.success);
        queryClient.invalidateQueries();
        push("/");
      },
      onError: (error: any) => {
        showAlert(error?.response?.data?.message, alertType.error);
      },
    }
  );
  const onSubmit = async () => {
    mutate();
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
        <LoadingButton
          variant="contained"
          color="primary"
          type="submit"
          className="bg-[#2196f3]"
          loading={isLoading}
        >
          Login
        </LoadingButton>
        <Typography>
          Do not you have an account? <Link href="/signup"> click here </Link>
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
    return { redirect: { destination: "/", permanent: false } };
  }
  return { props: { result } };
}
