import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import React from "react";
import { ColorModeContext, useMode } from "../../utils/theme";
import { useRouter } from "next/router";
import { useAlert } from "../../hooks/useAlert";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }: { children: React.ReactNode }) {
  const { route } = useRouter();
  const [theme, colorMode] = useMode();
  const [Alert] = useAlert();

  return (
    <Box>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header theme={theme} colorMode={colorMode} />
          {route === "/" || route === "/product/[slug]" ? (
            <Box sx={{ minHeight: "85vh" }}>{children}</Box>
          ) : (
            <Container
              sx={{ minHeight: "85vh", paddingY: "20px" }}
              maxWidth="lg"
            >
              {children}
            </Container>
          )}
          <Footer theme={theme}/>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Box>
  );
}

export default Layout;
