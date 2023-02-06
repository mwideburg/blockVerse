import "reflect-metadata"
import { DataSource } from "typeorm"
import * as path from "path";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 3000,
    username: "test",
    password: "test",
    database: "users",
    synchronize: true,
    logging: false,
    entities: [path.join(__dirname, './src/db/entities/*.entity{.ts,.js}')],
    migrations: ['./db/migration/*{.ts,.js}'],
    subscribers: [],
})
