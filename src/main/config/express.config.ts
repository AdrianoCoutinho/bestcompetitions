import cors from "cors";
import express from "express";

export const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  //   app.use("/admin", adminRoutes());

  return app;
};
