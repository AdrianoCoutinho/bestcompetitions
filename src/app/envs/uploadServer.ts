import * as dotenv from "dotenv";
dotenv.config();

export const uploadServerEnv = {
  secret: process.env.UPLOAD_SERVER,
};
