// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// Extending the User type to include `token` and `accessToken`
declare module "next-auth" {
  interface User {
    accessToken: string;       // Add the token property
    email: string;       // If necessary, specify any additional properties
  }

  interface Session {
    accessToken: string; // Add the accessToken property
  }

  interface JWT {
    accessToken?: string;  // Token might be undefined initially
  }

}
