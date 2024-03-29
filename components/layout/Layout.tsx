import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { ColorModeContext, useMode } from "../../utils/theme";
import { useRouter } from "next/router";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

function Layout({ children }: { children: React.ReactNode }) {
  const { route } = useRouter();
  const [theme, colorMode] = useMode();

  return (
    <Box>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background:
                  theme.palette.mode === "dark" ? "#030712" : "#e5e7eb",
                color: theme.palette.mode === "dark" ? "#f9fafb" : "#030712",
              },
            }}
          />
          <Header colorMode={colorMode} />
          {route === "/" || route === "/shop/[slug]"|| route === "/shop" ? (
            <Box sx={{ minHeight: "85vh" }}>{children}</Box>
          ) : (
            <Container
              sx={{ minHeight: "85vh", paddingY: "20px" }}
              maxWidth="lg"
            >
              {children}
            </Container>
          )}
          <Footer />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Box>
  );
}

export default Layout;
