import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "~/prisma/client";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      /**
       * Provide client id and client secret for connecting with oauth account.
       */
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      /**
       * Force Google provide refresh token as Google does not provide refresh token for the second time user login.
       * This mechanism should be approved by user
       */
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
});

export { handler as GET, handler as POST };
