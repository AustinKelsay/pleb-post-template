import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import UserCard from "../user/UserCard";

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const navigateToSignin = () => {
    router.push("/signin");
  };

  const isAuthenticated = status === "authenticated";

  return (
    <Flex
      as="nav"
      p="4"
      backgroundColor="gray.700"
      width="100%"
      justifyContent="space-between"
      alignItems="center"
    >
      <Menu>
        <MenuButton as={Button}>Menu</MenuButton>
        <MenuList>
          <MenuItem onClick={() => router.push("/")}>Posts</MenuItem>
          <MenuItem
            onClick={() => router.push(`/user/${session?.user?.username}`)}
            isDisabled={!isAuthenticated}
          >
            Profile
          </MenuItem>
        </MenuList>
      </Menu>

      <UserCard />
      <Button
        colorScheme="blue"
        onClick={() => (!isAuthenticated ? navigateToSignin() : signOut())}
      >
        {!isAuthenticated ? "signin" : "signout"}
      </Button>
    </Flex>
  );
};

export default Navbar;
