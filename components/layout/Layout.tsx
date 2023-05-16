import {
  AppBar,
  Box,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ backgroundColor: "white" }}>
      <AppBar position="static" sx={{ backgroundColor: "#203040" }}>
        <Toolbar>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            sx={{ width: "100%" }}
          >
            <Link href="/">
              <Typography fontWeight={700} fontSize={"20px"}>
                Next Shop
              </Typography>
            </Link>
            <Stack direction={"row"} spacing={2}>
              <Link href="/cart">
                <Typography>Cart</Typography>
              </Link>
              <Link href="/login">
                <Typography>Login</Typography>
              </Link>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Container sx={{ minHeight: "85vh", paddingY: "20px" }} maxWidth="xl">
        {children}
      </Container>
      <footer>
        <Typography align="center" color="black">
          All rights reserved - Next Shop.
        </Typography>
      </footer>
    </Box>
  );
}

export default Layout;
