import "reflect-metadata"
import { DataSource } from "typeorm"
import * as path from "path";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "testdb",
    synchronize: true,
    logging: false,
    entities: [path.join(__dirname, './db/entities/*.entity{.ts,.js}')],
    migrations: ['./db/migration/*{.ts,.js}'],
    subscribers: [],
})
