import { Typography, Box, useTheme, Modal } from "@mui/material";

export default function Shipping({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const theme = useTheme();

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          maxWidth: 800,
          minWidth: 300,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant={"h5"}>Shipping</Typography>
        <Box className="list-item list-inside text-[#2196f3] py-1">
          <Typography
            color={theme.palette.mode === "dark" ? "white" : "black"}
            className="inline"
          >
            Complimentary ground shipping within 1 to 7 business days
          </Typography>
        </Box>
        <Box className="list-item list-inside text-[#2196f3] py-1">
          <Typography
            color={theme.palette.mode === "dark" ? "white" : "black"}
            className="inline"
          >
            In-store collection available within 1 to 7 business days
          </Typography>
        </Box>
        <Box className="list-item list-inside text-[#2196f3] py-1">
          <Typography
            color={theme.palette.mode === "dark" ? "white" : "black"}
            className="inline"
          >
            Next-day and Express delivery options also available
          </Typography>
        </Box>
        <Box className="list-item list-inside text-[#2196f3] py-1">
          <Typography
            color={theme.palette.mode === "dark" ? "white" : "black"}
            className="inline"
          >
            Purchases are delivered in an orange box tied with a Bolduc ribbon,
            with the exception of certain items
          </Typography>
        </Box>
        <Box className="list-item list-inside text-[#2196f3] py-1">
          <Typography
            color={theme.palette.mode === "dark" ? "white" : "black"}
            className="inline"
          >
            See the delivery FAQs for details on shipping methods, costs and
            delivery times
          </Typography>
        </Box>
        <Box>
          <Typography
            color={theme.palette.mode === "dark" ? "white" : "black"}
            variant={"h5"}
          >
            Returns and Exchanges
          </Typography>
        </Box>
        <Box className="list-item list-inside text-[#2196f3] py-1">
          <Typography
            color={theme.palette.mode === "dark" ? "white" : "black"}
            className="inline"
          >
            Easy and complimentary, within 14 days
          </Typography>
        </Box>
        <Box className="list-item list-inside text-[#2196f3] py-1">
          <Typography
            color={theme.palette.mode === "dark" ? "white" : "black"}
            className="inline"
          >
            See conditions and procedure in our return FAQs
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
}
