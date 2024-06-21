import Queue from "bull";
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

clipQueue.process(createClipJob.handle);

clipQueue.on("completed", (job: any, result: any) => {
  console.log(`Job ${job.id} completed with result ${result}`);
});

clipQueue.on("failed", (job: any, err: any) => {
  console.error(`Job ${job.id} failed with error ${err}`);
});

export default clipQueue;
