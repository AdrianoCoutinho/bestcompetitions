import cors from "cors";
import express from "express";
import fs from "fs";
import path from "path";
import { uploadEnv } from "../../app/envs/upload.env";
import { apifyRoutes } from "../../app/features/apify/routes/apify.routes";
import { clipRoutes } from "../../app/features/clip/routes/clip.routes";
import { competitionRoutes } from "../../app/features/competition/routes/competition.routes";
import { dailywinRoutes } from "../../app/features/dailywin/routes/dailywin.routes";
import { loginRoutes } from "../../app/features/login/routes/login.routes";
import { registerRoutes } from "../../app/features/register/routes/register.routes";
import { registrationRoutes } from "../../app/features/registration/routes/registration.routes";
import { userRoutes } from "../../app/features/user/routes/user.routes";

export const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use("/register", registerRoutes());

  app.use("/auth", loginRoutes());

  app.use("/user", userRoutes());

  app.use("/competition", competitionRoutes());

  app.use("/registration", registrationRoutes());

  app.use("/clip", clipRoutes());

  app.use("/validations", apifyRoutes());

  app.use("/dailywin", dailywinRoutes());

  const publicDir = path.join(uploadEnv.secret || "../uploads");

  // Configura o middleware para servir arquivos estáticos
  app.use("/arquivos", express.static(publicDir));

  // Rota para listar todos os arquivos
  app.get("/listar-arquivos", (req, res) => {
    // Lê os arquivos presentes no diretório 'publicDir'
    fs.readdir(publicDir, (err, files) => {
      if (err) {
        console.error("Erro ao ler diretório:", err);
        res.status(500).send("Erro ao listar os arquivos: " + err.message);
      } else {
        // Envia a lista de arquivos como resposta
        res.send("Lista de arquivos: " + files.join(", "));
      }
    });
  });

  return app;
};
