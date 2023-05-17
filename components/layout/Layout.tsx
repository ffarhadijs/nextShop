import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  IconButton,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { ColorModeContext, useMode } from "../../utils/theme";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

function Layout({ children }: { children: React.ReactNode }) {
  const [theme, colorMode] = useMode();

  return (
    <Box>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar position="static" sx={{ backgroundColor: "#203040" }}>
            <Toolbar>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                sx={{ width: "100%", color: "white" }}
              >
                <Link href="/">
                  <Typography fontWeight={700} fontSize={"20px"}>
                    Next Shop
                  </Typography>
                </Link>

                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                  <IconButton
                    sx={{ ml: 1 }}
                    onClick={colorMode.toggleColorMode}
                    color="inherit"
                  >
                    {theme.palette.mode === "dark" ? (
                      <Brightness7Icon />
                    ) : (
                      <Brightness4Icon />
                    )}
                  </IconButton>
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
            <Typography align="center">
              All rights reserved - Next Shop.
            </Typography>
          </footer>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Box>
  );
}

export default Layout;
