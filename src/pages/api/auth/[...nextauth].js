import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      id: "lightning",
      name: "lightning",
      credentials: {
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
        const user = {
          username: credentials.username,
          wallet_id: credentials.wallet_id,
          wallet_admin: credentials.wallet_admin,
          admin_key: credentials.admin_key,
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
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token.user;

      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.split("/signin")[0];
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { jwt: true },
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
};

export default NextAuth(authOptions);
