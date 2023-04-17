import React from "react";
import { useSession, signOut } from "next-auth/react";
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

// This component displays the navigation bar at the top of the page
const Navbar = () => {
  // Get the current session data and status from the next-auth session hook
  const { data: session, status } = useSession();

  // Get the current router object
  const router = useRouter();

  // Function to navigate to the sign-in page when the button is clicked
  const navigateToSignin = () => {
    router.push("/signin");
  };

  // Check if the user is authenticated
  const isAuthenticated = status === "authenticated";

  // Render the navigation bar
  return (
    <Flex
      as="nav"
      p="4"
      backgroundColor="gray.700"
      width="100%"
      justifyContent="space-between"
      alignItems="center"
    >
      {/* Render the menu */}
      <Menu>
        <MenuButton as={Button}>Menu</MenuButton>
        {/* Render the menu items */}
        <MenuList>
          {/* Navigate to the home page when the "Posts" item is clicked */}
          <MenuItem onClick={() => router.push("/")}>Posts</MenuItem>
          {/* Navigate to the user's profile page when the "Profile" item is clicked */}
          {/* The item is disabled when the user is not authenticated */}
          <MenuItem
            onClick={() => router.push(`/user/${session?.user?.username}`)}
            isDisabled={!isAuthenticated}
          >
            Profile
          </MenuItem>
        </MenuList>
      </Menu>

      {/* Render the user card */}
      <UserCard />

      {/* Render the sign-in/sign-out button */}
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
