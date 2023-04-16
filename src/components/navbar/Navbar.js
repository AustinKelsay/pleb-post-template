import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import UserCard from "../user/UserCard";
import axios from "axios";
import styles from "./styles.module.css";

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const navigateToSignin = () => {
    router.push("/signin");
  };

  return (
    <div className={styles.navbar}>
      <Menu>
        <MenuButton as={Button}>Menu</MenuButton>
        <MenuList>
          <MenuItem onClick={() => router.push("/")}>Posts</MenuItem>
          <MenuItem
            onClick={() => router.push(`/user/${session.user.username}`)}
          >
            Profile
          </MenuItem>
        </MenuList>
      </Menu>

      <UserCard />
      <Button
        colorScheme="blue"
        onClick={() =>
          status !== "authenticated" ? navigateToSignin() : signOut()
        }
      >
        {status !== "authenticated" ? "signin" : "signout"}
      </Button>
    </div>
  );
};

export default Navbar;
