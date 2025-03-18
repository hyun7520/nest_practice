import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { BoardEntity } from "src/board/board.entitiy";
import { BoardRepository } from "src/board/board.repository";

export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '7520',
    database: 'Board',
    entities: [__dirname + '/../**/*.{entity}.{js,ts}', BoardEntity, BoardRepository],
    synchronize: true,
    autoLoadEntities: true
}