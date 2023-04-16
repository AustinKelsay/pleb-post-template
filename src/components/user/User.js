import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import axios from "axios";
import {
  Box,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  Button,
  HStack,
} from "@chakra-ui/react";
import { CreateInvoiceModal, PayInvoiceModal } from "./InvoiceModals";

const User = () => {
  const [userBalance, setUserBalance] = useState(null);
  const { data: session, status } = useSession();
  const [showCreateInvoiceForm, setShowCreateInvoiceForm] = useState(false);
  const [showPayInvoiceForm, setShowPayInvoiceForm] = useState(false);

  const formatPubkey = (pubkey) => {
    if (!pubkey) return "";
    return pubkey.slice(0, 6) + "..." + pubkey.slice(-6);
  };

  useEffect(() => {
    if (!session?.user) return;

    const headers = {
      "Content-Type": "application/json",
      "X-Api-Key": session.user.in_key,
    };

    axios
      .get(`${process.env.NEXT_PUBLIC_LN_BITS_DOMAIN}/api/v1/wallet`, {
        headers,
      })
      .then((res) => {
        console.log("user wallet res", res);

        setUserBalance(res.data.balance / 1000);
      })
      .catch((err) => {
        console.log("user wallet err");
        console.log(err);
      });
  }, [session]);

  const textColor = useColorModeValue("gray.100", "gray.300");

  return (
    <Box>
      {status === "authenticated" && (
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="space-between"
          borderRadius="0.5rem"
          padding="2rem"
        >
          <Image
            src={session?.user?.profilePhoto}
            alt="User profile photo"
            width={100}
            height={100}
            borderRadius="full"
          />
          <Heading as="h2" size="xl" marginTop="1rem" color={textColor}>
            {session?.user?.username}
          </Heading>
          <Flex
            direction="column"
            alignItems="center"
            marginTop="1rem"
            color={textColor}
          >
            <Text marginBottom="0.5rem">
              Pubkey: {formatPubkey(session?.user?.pubkey)}
            </Text>
            <Text>Balance: {userBalance} sats</Text>
            <Button colorScheme={"green"}>
              <a
                href={`${process.env.NEXT_PUBLIC_LN_BITS_DOMAIN}/wallet?usr=${session.user.wallet_user}&wal=${session.user.wallet_id}`}
                target="_blank"
                rel="noreferrer"
              >
                Visit LNBits wallet
              </a>
            </Button>
          </Flex>
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
        </Flex>
      )}
    </Box>
  );
};

export default User;
