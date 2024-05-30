import * as dotenv from "dotenv";
dotenv.config();

export const uploadEnv = {
  secret: process.env.UPLOAD_PATH,
};
