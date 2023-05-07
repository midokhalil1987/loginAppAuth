import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import ConnectMongo from "@/database/connect";
import Users from "@/model/Schema";
import { compare } from "bcryptjs";

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials, req) {
        ConnectMongo().catch((error) => {
          error: "Connection flailed";
        });

        // check user exist
        const result = await Users.findOne({ email: credentials.email });
        if (!result) {
          throw new Error("No user found please Sign Up");
        }
        // compare the password
        const checkPassword = await compare(
          credentials.password,
          result.password
        );
        if (!checkPassword || result.email !== credentials.email) {
          throw new Error("Invalid password or email");
        }
        return result;
      },
    }),
  ],
  // write in the console this:- 'openssl rand -base64 32' and then copy the password =>
  secret: "8i6xQjGXvyaQ97av7pRzN3clkiX88emmOqEPEbP0W7I=",
});
