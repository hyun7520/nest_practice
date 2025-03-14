import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "./board.model";

export class Board extends BaseEntity {

    // 엔티티의 기본키 설정
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: BoardStatus
}