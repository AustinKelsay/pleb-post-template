import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      id: "lightning",
      name: "lightning",
      credentials: {
        pubkey: { label: "pubkey", type: "text" },
        k1: { label: "k1", type: "text" },
      },
      async authorize(credentials, req) {
        const { k1, pubkey } = credentials;

        return { k1, pubkey };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user && user.pubkey && user.k1) {
        token.key = user.pubkey;
        token.k1 = user.k1;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.key && token.k1) {
        session.user.pubkey = token.key;
        session.user.k1 = token.k1;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { jwt: true },
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
};

export default NextAuth(authOptions);
