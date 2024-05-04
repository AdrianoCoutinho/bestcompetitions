import { DataSource } from "typeorm";
import { databaseEnv } from "../../app/envs/database.env";

let entities = "src/app/shared/database/entities/**/*.ts";
let migrations = "src/app/shared/database/migrations/**/*.ts";

if (databaseEnv.apiEnv === "production") {
  entities = "build/app/shared/database/entities/**/*.js";
  migrations = "build/app/shared/database/migrations/**/*.js";
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
