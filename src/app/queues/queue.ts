import Queue from "bull";
import { TypeormConnection } from "../../main/database/typeorm.connection";
import { redisEnv } from "../envs/redis.env";
import createClipJob from "../jobs/create-clip.job";

const redisConfig = {
  redis: {
    host: redisEnv.host,
    username: redisEnv.username,
    port: Number(redisEnv.port),
    password: redisEnv.password,
  },
};

const clipQueue = new Queue("createClip", redisConfig);

// Inicialize a conexão com o banco de dados antes de processar a fila
TypeormConnection.init()
  .then(() => {
    console.log("Data Source has been initialized!");

    clipQueue.process(createClipJob.handle);

    clipQueue.on("completed", (job, result) => {
      console.log(`Job ${job.id} completed with result ${result}`);
    });

    clipQueue.on("failed", (job, err) => {
      console.error(`Job ${job.id} failed with error ${err}`);
    });
  })
  .catch((err: any) => {
    console.error("Error during Data Source initialization", err);
  });

export default clipQueue;
