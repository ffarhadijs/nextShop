import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "#203040" }}>
        <Toolbar>
          <Typography>Next Shop</Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ minHeight: "85vh", paddingY: "20px" }} maxWidth="xl">
        {children}
      </Container>
      <footer>
        <Typography align="center">All rights reserved - Next Shop.</Typography>
      </footer>
    </Box>
  );
}

export default Layout;
