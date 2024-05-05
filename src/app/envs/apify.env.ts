import * as dotenv from "dotenv";
dotenv.config();

export const apifyEnv = {
  secret: process.env.APIFY_URL,
};
