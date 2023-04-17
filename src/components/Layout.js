import React from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "./navbar/Navbar";

// This component provides a basic layout for the entire app
// It wraps its children with a navbar and a main content area
const Layout = ({ children }) => {
  return (
    // Use the Chakra Box component to render a div with the layout styles
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
