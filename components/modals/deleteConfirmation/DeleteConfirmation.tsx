import LoadingButton from "@mui/lab/LoadingButton";
import { Typography, Box, Stack, Button } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export default function DeleteConfirmation({
  title,
  text,
  setOpen,
  confirmDeleteHandler,
  isLoading,
}: {
  title: string;
  text: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  confirmDeleteHandler: () => Promise<void>;
  isLoading: boolean;
}) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
      }}
    >
      <Typography fontSize={"16px"} fontWeight={"700"} mb={"10px"}>
        {title}
      </Typography>
      <Typography>{text}</Typography>
      <Stack
        direction="row"
        justifyContent={"end"}
        mt={"20px"}
        spacing={"10px"}
      >
        <Button
          onClick={() => setOpen(false)}
          className="bg-[#2196f3]"
          color="primary"
          variant="contained"
        >
          Cancel
        </Button>
        <LoadingButton
          onClick={confirmDeleteHandler}
          className="bg-[#f44336]"
          color="error"
          variant="contained"
          loading={isLoading}
        >
          Delete
        </LoadingButton>
      </Stack>
    </Box>
  );
}
