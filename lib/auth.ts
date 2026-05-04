import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from "./mongodb";


const client = await clientPromise;
const db = client.db("elegant-surfaces");

export const auth = betterAuth({
  
  database: mongodbAdapter(db),
  
  secret: process.env.BETTER_AUTH_SECRET as string,
  baseURL: process.env.BETTER_AUTH_URL as string,
  
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string || "placeholder",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string || "placeholder",
    },
  },
});