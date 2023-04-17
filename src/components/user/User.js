import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import axios from "axios";
import {
  Box,
  Heading,
  Text,
  useColorModeValue,
  Button,
  HStack,
  VStack,
  Link,
} from "@chakra-ui/react";
import { CreateInvoiceModal, PayInvoiceModal } from "./InvoiceModals";

const User = () => {
  const [userBalance, setUserBalance] = useState(null); // State to keep track of user's balance
  const { data: session, status } = useSession(); // Get the current session's data and status
  const [showCreateInvoiceForm, setShowCreateInvoiceForm] = useState(false); // State to control whether to show the create invoice modal
  const [showPayInvoiceForm, setShowPayInvoiceForm] = useState(false); // State to control whether to show the pay invoice modal

  useEffect(() => {
    if (!session?.user) return; // If there is no session, do nothing

    const headers = {
      "Content-Type": "application/json",
      "X-Api-Key": session.user.in_key,
    };

    const fetchBalance = () => {
      axios
        .get(`${process.env.NEXT_PUBLIC_LN_BITS_DOMAIN}/api/v1/wallet`, {
          headers,
        })
        .then((res) => {
          setUserBalance(res.data.balance / 1000); // Update the user's balance with the response data
        })
        .catch((err) => {
          console.log("user wallet err");
          console.log(err);
        });
    };

    fetchBalance(); // Fetch balance immediately on mount

    const intervalId = setInterval(fetchBalance, 3000); // Fetch balance every 3 seconds

    return () => clearInterval(intervalId); // Cleanup function to clear interval
  }, [session]); // Only run this effect when the session changes

  const textColor = useColorModeValue("gray.100", "gray.300"); // Set text color based on color mode

  // Render the user information if the user is authenticated
  return (
    <Box>
      {status === "authenticated" && (
        <VStack
          alignItems="center"
          justifyContent="space-between"
          borderRadius="0.5rem"
          padding="2rem"
          spacing={4}
        >
          {/* Display the user's profile photo */}
          <Image
            src={session?.user?.profilePhoto}
            alt="User profile photo"
            width={100}
            height={100}
          />
          {/* Display the user's public key */}
          <Heading as="h2" size="xl" color={textColor}>
            {session?.user?.pubkey}
          </Heading>
          <VStack alignItems="center" color={textColor} spacing={2}>
            {/* Display the user's balance */}
            <Text>Balance: {userBalance} sats</Text>
            {/* Link to the user's LNBits wallet */}
            <Link
              href={`${process.env.NEXT_PUBLIC_LN_BITS_DOMAIN}/wallet?usr=${session.user.wallet_user}&wal=${session.user.wallet_id}`}
              isExternal
            >
              <Button colorScheme={"green"}>Visit LNBits wallet</Button>
            </Link>
          </VStack>
          <HStack
            width="100%"
            marginTop="1rem"
            spacing={4}
            justifyContent={"center"}
          >
            {/* Button to open the create invoice modal */}
            <Button
              colorScheme="blue"
              onClick={() => setShowCreateInvoiceForm(true)}
            >
              Create invoice
            </Button>
            {/* Create invoice modal */}
            <CreateInvoiceModal
              isOpen={showCreateInvoiceForm}
              onClose={() => setShowCreateInvoiceForm(false)}
            />

            {/* Button to open the pay invoice modal */}
            <Button
              colorScheme="blue"
              onClick={() => setShowPayInvoiceForm(true)}
            >
              Pay invoice
            </Button>
            {/* Pay invoice modal */}
            <PayInvoiceModal
              isOpen={showPayInvoiceForm}
              onClose={() => setShowPayInvoiceForm(false)}
            />
          </HStack>
        </VStack>
      )}
    </Box>
  );
};

export default User;
