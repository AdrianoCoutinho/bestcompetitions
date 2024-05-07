import { DataSource } from "typeorm";
import { databaseEnv } from "../../app/envs/database.env";

let entities = "build/app/shared/database/entities/**/*.js";
let migrations = "build/app/shared/database/migrations/**/*.js";

if (databaseEnv.apiEnv === "dev") {
  entities = "src/app/shared/database/entities/**/*.ts";
  migrations = "src/app/shared/database/migrations/**/*.ts";
}

export default new DataSource({
  type: "postgres",
  host: databaseEnv.host,
  username: databaseEnv.username,
  password: databaseEnv.password,
  database: databaseEnv.database,
  schema: "bestcompetitions",
  synchronize: false,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [entities],
  migrations: [migrations],
});
