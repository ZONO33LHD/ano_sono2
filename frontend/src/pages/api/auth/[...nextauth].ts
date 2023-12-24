import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  session: {
    maxAge: 3600,
  },


  callbacks: {
    redirect: async ({url, baseUrl}) => {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  }
});

export default handler;
