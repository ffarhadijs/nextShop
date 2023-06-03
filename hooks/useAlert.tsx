import { Alert as AlertMui, Snackbar } from "@mui/material";
import { useState } from "react";

export enum alertType {
  success = "success",
  error = "error",
  warnint = "warning",
  info = "info",
}

export const useAlert = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<alertType>(alertType.error);

  const showAlert = (message: string, type: alertType) => {
    setOpen(true);
    setMessage(message);
    setType(type);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const Alert: any = () => (
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
      <AlertMui onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </AlertMui>
    </Snackbar>
  );
  return [showAlert, Alert];
};
