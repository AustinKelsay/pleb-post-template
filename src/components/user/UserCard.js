import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import axios from "axios";
import styles from "./styles.module.css";

const UserCard = () => {
  const [userBalance, setUserBalance] = useState(null);
  const { data: session, status } = useSession();

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

    axios
      .get(`https://d42da20dc9.d.voltageapp.io/api/v1/wallet`, {
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

  return (
    <div>
      {status === "authenticated" ? (
        <div className={styles.userCard}>
          <Image
            src={session?.user?.profilePhoto}
            alt="User profile photo"
            width={50}
            height={50}
          />
          <div className={styles.userInfo}>
            <span>{formatPubkey(session?.user?.pubkey)}</span>
            <span>balance: {userBalance}</span>
          </div>
        </div>
      ) : (
        <div className={styles.userInfo}>
          <p>unauthenticated</p>
        </div>
      )}
    </div>
  );
};

export default UserCard;
