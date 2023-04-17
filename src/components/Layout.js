import React from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "./navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      backgroundColor="#1A202C"
      minHeight="100vh"
      width="100%"
    >
      <Navbar />
      <main>{children}</main>
    </Box>
  );
};

export default Layout;
