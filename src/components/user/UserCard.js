import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import {
  Flex,
  Text,
  useColorModeValue,
  chakra,
  useToken,
} from "@chakra-ui/react";

const UserCard = () => {
  const [userBalance, setUserBalance] = useState(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  const formatPubkey = (pubkey) => {
    if (!pubkey) return "";
    return pubkey.slice(0, 6) + "..." + pubkey.slice(-6);
  };

  useEffect(() => {
    console.log("session", session);
  }, [session]);

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
  const backgroundColor = useColorModeValue("gray.800", "gray.700");
  const hoverOpacity = useToken("opacities", "200");

  const handleClick = () => {
    const currentRoute = router.asPath;
    if (!currentRoute.startsWith("/user/") && status === "authenticated") {
      router.replace(`user/${session.user.pubkey}`);
    }
  };

  return (
    <chakra.div
      onClick={handleClick}
      backgroundColor={backgroundColor}
      borderRadius="0.5rem"
      padding="0.5rem 1rem"
      _hover={{ opacity: hoverOpacity, cursor: "pointer" }}
    >
      {status === "authenticated" ? (
        <Flex
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          borderRadius="0.5rem"
          padding="0.5rem 1rem"
        >
          <Image
            src={session?.user?.profilePhoto}
            alt="User profile photo"
            width={50}
            height={50}
          />
          <Flex
            direction="column"
            alignItems="flex-start"
            paddingLeft="3%"
            color={textColor}
          >
            <Text marginRight="1rem">
              {formatPubkey(session?.user?.pubkey)}
            </Text>
            <Text marginRight="1rem">balance: {userBalance}</Text>
          </Flex>
        </Flex>
      ) : (
        <Flex direction="column" alignItems="flex-start" color={textColor}>
          <Text>unauthenticated</Text>
        </Flex>
      )}
    </chakra.div>
  );
};

export default UserCard;
