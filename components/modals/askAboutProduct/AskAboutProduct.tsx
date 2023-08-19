import { Button, Stack, Box, TextField, FormLabel, Modal } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  name: yup
    .string()
    .min(3, "It should be at least 3 characters")
    .required("You shoulld input your name"),
  email: yup
    .string()
    .email("Email address is not in correct format")
    .required("You shoulld input your email address"),
  message: yup.string().required("You shoulld input your message"),
});

export default function AskAboutProduct({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = () => {};

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          minWidth: 300,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack direction={"column"}>
          <FormLabel>Name:</FormLabel>
          <TextField
            {...register("name")}
            size="small"
            error={!!errors.name}
            helperText={errors.name?.message?.toString()}
          />
        </Stack>
        <Stack direction={"column"} my={"20px"}>
          <FormLabel>Email:</FormLabel>
          <TextField
            {...register("email")}
            size="small"
            error={!!errors.email}
            helperText={errors.email?.message?.toString()}
          />
        </Stack>
        <Stack direction={"column"}>
          <FormLabel>Message:</FormLabel>
          <TextField
            {...register("message")}
            size="small"
            error={!!errors.message}
            helperText={errors.message?.message?.toString()}
            multiline
          />
        </Stack>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="bg-[#2196f3] mt-[20px]"
        >
          Send Message
        </Button>
      </Box>
    </Modal>
  );
}
