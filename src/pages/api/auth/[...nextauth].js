import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Define the authentication options for NextAuth
const authOptions = {
  providers: [
    CredentialsProvider({
      id: "lightning",
      name: "lightning",
      credentials: {
        // Define the credentials that users must provide to authenticate
        username: {
          label: "Username",
          type: "text",
          placeholder: "username",
        },
        wallet_id: {
          label: "Wallet ID",
          type: "text",
          placeholder: "wallet_id",
        },
        wallet_admin: {
          label: "Wallet Admin",
          type: "text",
          placeholder: "wallet_admin",
        },
        wallet_user: {
          label: "Wallet User",
          type: "text",
          placeholder: "wallet_user",
        },
        admin_key: {
          label: "Admin Key",
          type: "text",
          placeholder: "admin_key",
        },
        in_key: { label: "In Key", type: "text", placeholder: "in_key" },
        pubkey: { label: "Pubkey", type: "text", placeholder: "pubkey" },
        k1: { label: "K1", type: "text", placeholder: "k1" },
        profilePhoto: {
          label: "Profile Photo",
          type: "text",
          placeholder: "profilePhoto",
        },
      },
      async authorize(credentials, req) {
        // Define the authorize function to validate user credentials
        const user = {
          username: credentials.username,
          wallet_id: credentials.wallet_id,
          wallet_admin: credentials.wallet_admin,
          admin_key: credentials.admin_key,
          wallet_user: credentials.wallet_user,
          in_key: credentials.in_key,
          pubkey: credentials.pubkey,
          k1: credentials.k1,
          profilePhoto: credentials.profilePhoto,
        };

        return user;
      },
    }),
  ],
  callbacks: {
    // Define the callbacks for the authentication process
    async jwt({ token, user }) {
      // Define the jwt callback to add the user object to the token
      if (user) {
        token.user = user;
      }

      return token;
    },
    async session({ session, token }) {
      // Define the session callback to add the user object to the session
      session.user = token.user;

      return session;
    },
    async redirect({ url, baseUrl }) {
      // Define the redirect callback to redirect the user to the root URL after signing in
      return url.split("/signin")[0];
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Set the secret key used for encryption
  session: { jwt: true }, // Use JWTs for session tokens
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY, // Set the private key used for signing JWTs
  },
};

// Export the NextAuth object with the defined authentication options
export default NextAuth(authOptions);
