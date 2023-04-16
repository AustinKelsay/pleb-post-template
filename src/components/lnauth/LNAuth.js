import React, { useState, useEffect } from "react";
import axios from "axios";
import QRCode from "qrcode.react";
import { useSession, signIn } from "next-auth/react";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";

const LNAuth = () => {
  const [lnurl, setLnurl] = useState(null);
  const [k1, setK1] = useState(null);
  const [user, setUser] = useState(null);

  const { data: session, status } = useSession();

  // Function to sign in the user using NextAuth
  const signInUser = async () => {
    try {
      signIn("lightning", {
        username: user.username,
        wallet_id: user.wallet_id,
        wallet_admin: user.wallet_admin,
        wallet_user: user.wallet_user,
        admin_key: user.admin_key,
        in_key: user.in_key,
        pubkey: user.pubkey,
        k1: user.k1,
        profilePhoto: user.profilePhoto,
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
      // Check if the user has been authenticated
      if (session && session.user && session.user.pubkey) {
        // Clear the interval to stop polling
        clearInterval(intervalId);
      }
    } catch (error) {
      console.error("Error polling for verified response:", error);
    }
  };

  // Poll for a verified response every 2 seconds
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

  const textColor = useColorModeValue("gray.500", "whiteAlpha.700");

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      marginTop="2rem"
    >
      {status === "loading" && (
        <Text fontSize="1.2rem" fontWeight="500" color={textColor}>
          Loading...
        </Text>
      )}
      {status === "unauthenticated" && (
        <Box marginTop="1rem">
          <QRCode size={256} value={lnurl} />
        </Box>
      )}
      {status === "authenticated" && session.user.pubkey && (
        <Box marginTop="1rem">
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
