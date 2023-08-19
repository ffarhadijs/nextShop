import LoadingButton from "@mui/lab/LoadingButton";
import { Typography, Box, Stack, Button, Modal } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export default function DeleteConfirmation({
  title,
  text,
  confirmDeleteHandler,
  isLoading,
  open,
  setOpen,
}: {
  title: string;
  text: string;
  confirmDeleteHandler: () => Promise<void>;
  isLoading: boolean;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        width={{ xs: 350, sm: 400 }}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography fontSize={"18px"} fontWeight={"700"} mb={"24px"}>
          {title}
        </Typography>
        <Typography>{text}</Typography>
        <Stack
          direction="row"
          justifyContent={"end"}
          mt={"30px"}
          spacing={"15px"}
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
    </Modal>
  );
}
