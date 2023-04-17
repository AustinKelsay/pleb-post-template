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
  const [userBalance, setUserBalance] = useState(null);
  const { data: session, status } = useSession();
  const [showCreateInvoiceForm, setShowCreateInvoiceForm] = useState(false);
  const [showPayInvoiceForm, setShowPayInvoiceForm] = useState(false);

  useEffect(() => {
    if (!session?.user) return;

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
          setUserBalance(res.data.balance / 1000);
        })
        .catch((err) => {
          console.log("user wallet err");
          console.log(err);
        });
    };

    fetchBalance(); // Fetch balance immediately on mount

    const intervalId = setInterval(fetchBalance, 3000); // Fetch balance every 3 seconds

    return () => clearInterval(intervalId); // Cleanup function to clear interval
  }, [session]);

  const textColor = useColorModeValue("gray.100", "gray.300");

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
          <Image
            src={session?.user?.profilePhoto}
            alt="User profile photo"
            width={100}
            height={100}
          />
          <Heading as="h2" size="xl" color={textColor}>
            {session?.user?.pubkey}
          </Heading>
          <VStack alignItems="center" color={textColor} spacing={2}>
            <Text>Balance: {userBalance} sats</Text>
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
            <Button
              colorScheme="blue"
              onClick={() => setShowCreateInvoiceForm(true)}
            >
              Create invoice
            </Button>
            <CreateInvoiceModal
              isOpen={showCreateInvoiceForm}
              onClose={() => setShowCreateInvoiceForm(false)}
            />

            <Button
              colorScheme="blue"
              onClick={() => setShowPayInvoiceForm(true)}
            >
              Pay invoice
            </Button>
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
