import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { UserEntity } from "src/auth/user.entity";
import { UserRepository } from "src/auth/user.repository";
import { BoardEntity } from "src/board/board.entitiy";
import { BoardRepository } from "src/board/board.repository";

export const typeORMConfig = async (configService: ConfigService,): Promise<TypeOrmModuleOptions> => {
    return {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: configService.get<string>('DB_PASSWORD'),
        database: 'Board',
        entities: [__dirname + '/../**/*.{entity}.{js,ts}', BoardEntity, BoardRepository, UserEntity, UserRepository],
        synchronize: true,
        autoLoadEntities: true,
        // 서버 재실행 시 스키마의 테이블 날림
        dropSchema: true
    }
}