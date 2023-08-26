import { FormLabel, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SignupFormType } from "../types/signup.type";
import { verifyToken } from "../utils/verifyToken";
import { useRouter } from "next/router";
import { useSignup } from "../hooks/auth/auth.hooks";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";
import { GetServerSidePropsContext } from "next";

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
  const {
    register,
    handleSubmit,
    watch,
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
  const { mutate, isLoading } = useSignup(
    watch("name"),
    watch("email"),
    watch("password"),
    watch("confirmPassword"),
    watch("isAdmin"),
    {
      onSuccess: () => {
        toast.success("User signed up successfully!");
        push("/login");
      },
      onError: (error: any) => {
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
          <TextField
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Stack>
        <Stack direction="column" width={"100%"}>
          <FormLabel>Email:</FormLabel>
          <TextField
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Stack>
        <Stack direction="column">
          <FormLabel>Password:</FormLabel>
          <TextField
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Stack>
        <Stack direction="column">
          <FormLabel>Confirm Password:</FormLabel>
          <TextField
            type="password"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
        </Stack>
        <LoadingButton
          variant="contained"
          color="primary"
          type="submit"
          className="bg-[#2196f3]"
          loading={isLoading}
        >
          Signup
        </LoadingButton>
        <Typography>
          Do you have any account already?{" "}
          <Link href="/login">click here </Link>
        </Typography>
      </Stack>
    </>
  );
};

export default Signup;

Signup.title = "Signup Page|Shop Next";
Signup.description = "Signup to complete your shipping information";
