import { DataSource, Repository } from "typeorm";
import { BoardEntity } from "../board/board.entitiy"
import { Injectable } from "@nestjs/common";


@Injectable()
export class BoardRepository extends Repository<BoardEntity> {
    constructor(private dataSource: DataSource) {
        super(BoardEntity, dataSource.createEntityManager());
    }

    async getById(id: number) {
        return this.findOne({ where: { id } });
    }
}