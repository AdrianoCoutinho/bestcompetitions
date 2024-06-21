import { RedisConnection } from "./main/database/redis.connection";
import { Server } from "./main/server/express.server";

Promise.all([RedisConnection.connect()]).then(Server.run);
