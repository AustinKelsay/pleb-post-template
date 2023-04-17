import React, { useState, useEffect } from "react";
import axios from "axios";
import QRCode from "qrcode.react";
import { useSession, signIn } from "next-auth/react";
import { Box, Flex, Spacer, Text, useColorModeValue } from "@chakra-ui/react";

const LNAuth = () => {
  // State variables to store lnurl, k1, and user data
  const [lnurl, setLnurl] = useState(null);
  const [k1, setK1] = useState(null);
  const [user, setUser] = useState(null);

  // Use the NextAuth hook to get session data and status
  const { data: session, status } = useSession();

  // Function to sign in the user using NextAuth and the lightning provider
  const signInUser = async () => {
    try {
      signIn("lightning", {
        ...user,
        k1: user.k1,
      });
    } catch (error) {
      console.error("Error signing in user:", error);
    }
  };

  // Fetch the lnurl-challenge from the server when the component mounts
  useEffect(() => {
    const fetchLnurl = async () => {
      try {
        const response = await axios.get("/api/auth/lnurl-challenge");
        const data = response.data;
        setLnurl(data.lnurl);
        setK1(data.k1);
      } catch (error) {
        console.error("Error fetching lnurl:", error);
      }
    };

    fetchLnurl();
  }, []);

  // Function to poll the server for a verified response (the signed challenge being verified by our server)
  const pollForVerifiedResponse = async () => {
    try {
      const response = await axios.get(`/api/auth/pending?k1=${k1}`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });

      const data = response.data;

      if (data.user) {
        setUser(data.user);
      }
    } catch (error) {
      console.error("Error polling for verified response:", error);
    }
  };

  // Poll for a verified response every 2 seconds and sign in the user if they exist
  useEffect(() => {
    if (user) {
      signInUser();
    } else {
      const intervalId = setInterval(pollForVerifiedResponse, 2000);
      return () => clearInterval(intervalId);
    }
  }, [k1, user]);

  // Log the session data when it changes
  useEffect(() => {
    console.log("session", session);
  }, [session]);

  // Determine text color based on the current color mode
  const textColor = useColorModeValue("gray.100", "gray.300");

  // Render the appropriate content based on the authentication status
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      mt="2rem"
    >
      {/* Show loading message if status is "loading" */}
      {status === "loading" && (
        <Text fontSize="1.2rem" fontWeight="500" color={textColor}>
          Loading...
        </Text>
      )}

      {/* Show LNURL-Auth QR code if status is "unauthenticated" */}
      {status === "unauthenticated" && (
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Text fontSize="1.2rem" fontWeight="500" color={textColor}>
            Scan with any LNURL-Auth enabled lightning wallet to sign in or sign
            up for the first time
          </Text>
          <Spacer m={10} />
          <QRCode size={256} value={lnurl} />
        </Flex>
      )}

      {/* Show the user's pubkey if status is "authenticated" */}
      {status === "authenticated" && session.user.pubkey && (
        <Box mt="1rem">
          <Text
            fontSize="1.2rem"
            fontWeight="500"
            textAlign="center"
            color={textColor}
          >
            Signed in with this node pubkey {session.user.pubkey}
          </Text>
        </Box>
      )}
    </Flex>
  );
};

export default LNAuth;
