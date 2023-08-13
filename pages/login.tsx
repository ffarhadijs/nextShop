import { FormLabel, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LoginFormType } from "../types/login.type";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { verifyToken } from "../utils/verifyToken";
import { useSignin } from "../hooks/auth/auth.hooks";
import LoadingButton from "@mui/lab/LoadingButton";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { GetServerSidePropsContext } from "next";

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

const Login = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: yupResolver(schema),
  });

  const { mutate, isLoading } = useSignin(watch("email"), watch("password"), {
    onSuccess: () => {
      toast.success("User signed in successfully!");
      queryClient.invalidateQueries();
      push("/");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

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
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Stack>
        <Stack direction="column">
          <FormLabel>Password:</FormLabel>
          <TextField
            type="password"
            placeholder="Enter your password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
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
    </>
  );
};

export default Login;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { token } = context.req.cookies;
  const secretKey = process.env.SECRET_KEY;

  const result = verifyToken(token!, secretKey!);

  if (result) {
    return { redirect: { destination: "/", permanent: false } };
  }
  return { props: { result } };
}
