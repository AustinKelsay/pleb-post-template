import React, { useState, useEffect } from "react";
import axios from "axios";
import QRCode from "qrcode.react";
import { useSession, signIn } from "next-auth/react";

const LNAuth = () => {
  const [lnurl, setLnurl] = useState(null);
  const [k1, setK1] = useState(null);
  const [pubkey, setPubkey] = useState(null);

  const { data: session, status } = useSession();

  // Function to sign in the user using NextAuth
  const signInUser = async () => {
    try {
      signIn("lightning", {
        k1,
        pubkey,
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
      } catch (error) {
        console.error("Error fetching lnurl:", error);
      }
    };

    fetchLnurl();
  }, []);

  // Function to poll the server for a verified response (the signed challenge being verified by our server)
  const pollForVerifiedResponse = async () => {
    try {
      const response = await axios.get("/api/auth/pending", {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });

      const data = response.data;
      if (data.k1 && data.pubkey) {
        setK1(data.k1);
        setPubkey(data.pubkey);
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
    if (k1 && pubkey) {
      console.log("k1 and pubkey are set");
      signInUser();
    } else {
      const intervalId = setInterval(pollForVerifiedResponse, 2000);
      return () => clearInterval(intervalId);
    }
  }, [pubkey, k1]);

  // Log the session data when it changes
  useEffect(() => {
    console.log("session", session);
  }, [session]);

  return (
    <div>
      {status === "loading" && <div>Loading...</div>}
      {status === "unauthenticated" && <QRCode size={256} value={lnurl} />}
      {status === "authenticated" && session.user.pubkey && (
        <div>
          <div>Signed in with this node pubkey {session.user.pubkey}</div>
        </div>
      )}
    </div>
  );
};

export default LNAuth;