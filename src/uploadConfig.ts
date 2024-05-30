import multer from "multer";
import path from "path";
import { uploadEnv } from "./app/envs/upload.env";

export const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.resolve(__dirname, uploadEnv.secret || "../uploads"));
  },
  filename: (req, file, callback) => {
    const time = new Date().getTime();
    callback(null, `${time}_${file.originalname}`);
  },
});

const upload = multer({ storage });
export default upload;
