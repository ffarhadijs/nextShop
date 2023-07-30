import {
  AppBar,
  Badge,
  Box,
  Container,
  CssBaseline,
  IconButton,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { ColorModeContext, useMode } from "../../utils/theme";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Store } from "../../utils/Store";
import { useRouter } from "next/router";
import { alertType, useAlert } from "../../hooks/useAlert";
import { userData } from "../../utils/userData";

function Layout({ children }: { children: React.ReactNode }) {
  const { push, route } = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const user = userData();
  const [theme, colorMode] = useMode();
  const { state } = useContext(Store);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const [showAlert, Alert] = useAlert();

  const logoutHandler = async () => {
    const response = await fetch("/api/auth/logout");
    const data = await response.json();
    if (response.ok) {
      showAlert(data.message, alertType.success);
      push("/login");
    } else {
      showAlert(data.message, alertType.error);
    }
    setAnchorEl(null);
  };
  const dashboardHandler = () => {
    router.push("/admin-dashboard");
    setAnchorEl(null);
  };

  const orderHandler = () => {
    router.push("/orders-list");
    setAnchorEl(null);
  };

  const profileHandler = () => {
    router.push("/profile");
    setAnchorEl(null);
  };

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
                    <Badge
                      badgeContent={state?.cart.cartItems.length}
                      color="secondary"
                    >
                      <Typography>Cart</Typography>
                    </Badge>
                  </Link>

                  {!!user ? (
                    <>
                      <Button onClick={handleClick} sx={{ color: "white" }}>
                        {user?.name}
                      </Button>
                      <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={() => setAnchorEl(null)}
                      >
                        <MenuItem onClick={profileHandler}>Profile</MenuItem>
                        <MenuItem onClick={orderHandler}>Orders List</MenuItem>
                        <MenuItem onClick={dashboardHandler}>
                          Admin Dashboard
                        </MenuItem>
                        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                      </Menu>
                    </>
                  ) : (
                    <Link href="/login">
                      <Typography> Login </Typography>
                    </Link>
                  )}
                </Stack>
              </Stack>
            </Toolbar>
          </AppBar>
          {route === "/" ? (
            <Box sx={{ minHeight: "85vh" }}>
              {children}
              <Alert />
            </Box>
          ) : (
            <Container
              sx={{ minHeight: "85vh", paddingY: "20px" }}
              maxWidth="xl"
            >
              {children}
              <Alert />
            </Container>
          )}
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
