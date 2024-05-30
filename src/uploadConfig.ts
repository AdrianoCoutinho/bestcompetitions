import multer from "multer";
import path from "path";

export const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.resolve(__dirname, "../src/app/assets/public")); // Certifique-se de usar o caminho correto
  },
  filename: (req, file, callback) => {
    const time = new Date().getTime();
    callback(null, `${time}_${file.originalname}`);
  },
});

const upload = multer({ storage });
export default upload;
