import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import User from "@/components/user/User";

const UserPage = () => {
  const { data: session, status } = useSession();

  return (
    <div>
      {status === "authenticated" ? (
        <User />
      ) : (
        <div>
          <h1>Not signed in</h1>
        </div>
      )}
    </div>
  );
};

export default UserPage;
