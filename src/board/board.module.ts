import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { BoardEntity } from './board.entitiy';

@Module({
    imports: [
        TypeOrmModule.forFeature([BoardRepository])
    ],
    controllers: [BoardController],
    providers: [BoardService, BoardRepository],
})
export class BoardModule { }
