import { DataSource, Repository } from "typeorm";
import { BoardEntity } from "../board/board.entitiy"
import { Injectable } from "@nestjs/common";
import { CreateBoardDto } from "./dto/create-board.dto";

@Injectable()
export class BoardRepository extends Repository<BoardEntity> {
    constructor(dataSource: DataSource) {
        super(BoardEntity, dataSource.createEntityManager());
    }

    async getBoardById(id: number) {
        return this.findOneBy({ id: id });
    }
}