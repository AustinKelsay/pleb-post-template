import React, { useState, useEffect } from "react";
import axios from "axios";
import QRCode from "qrcode.react";
import { useSession, signIn } from "next-auth/react";
import styles from "./styles.module.css";

const LNAuth = () => {
  const [lnurl, setLnurl] = useState(null);
  const [k1, setK1] = useState(null);
  const [user, setUser] = useState(null);

  const { data: session, status } = useSession();

  // Function to sign in the user using NextAuth
  const signInUser = async () => {
    try {
      signIn("lightning", {
        user,
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

  return (
    <div className={styles.lnAuthContainer}>
      {status === "loading" && (
        <div className={styles.loadingText}>Loading...</div>
      )}
      {status === "unauthenticated" && (
        <QRCode size={256} value={lnurl} className={styles.qrCode} />
      )}
      {status === "authenticated" && session.user.pubkey && (
        <div>
          <div className={styles.signedInText}>
            Signed in with this node pubkey {session.user.pubkey}
          </div>
        </div>
      )}
    </div>
  );
};

export default LNAuth;
