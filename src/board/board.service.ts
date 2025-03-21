import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { BoardEntity } from './board.entitiy'
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardService {
    // // 배열일 경우 배열로 맞춰준다.
    // // DB 사용 시에는 불필요
    // private boards: Board[] = [];

    // // 모든 게시판 조회: 타입을 똑같이 정의
    // getAllBoards(): Board[] {
    //     return this.boards;
    // }

    // createBoard(createBoardDto: CreateBoardDto): Board {
    //     const { title, description } = createBoardDto;
    //     const board: Board = {
    //         // title: title,
    //         // description: description,
    //         // 명칭이 동일할 경우 생략가능
    //         id: uuid(),
    //         title,
    //         description,
    //         status: BoardStatus.PUBLIC,
    //     }

    //     // 새로운 게시물을 입력
    //     this.boards.push(board);
    //     return board;
    // }

    // getBoardById(id: string): Board {
    //     // Type 'undefined' is not assignable to type 'Board' 문제 해결
    //     // 값이 없는 경우에 대한 처리를 해주어야 한다.
    //     // 끝에 !을 붙임으로써 non-null assertion operator 역할을 한다.
    //     // const foundBoard = this.boards.find((board) => board.id === id)!;
    //     // 또는 아래와 같이 강제적으로 해당 값의 type을 Board로 지정
    //     const foundBoard = this.boards.find((board) => board.id === id) as Board;
    //     // board가 없을 시 에러 발생
    //     if (!foundBoard) {
    //         throw new NotFoundException(`Board ${id} does not exist`);
    //     }
    //     return foundBoard;
    // }

    // updateBoard(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }

    // deleteBoardById(id: string): void {
    //     const foundBoard = this.getBoardById(id);
    //     // boards 배열에서 파라미터로 받은 id와 다른 것만 남기겠다.
    //     this.boards = this.boards.filter((board) => board.id !== foundBoard.id);
    // }

    // 레포지토리 설정

    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ) { }

    // typeOrm 사용 시 async await 사용
    async getBoardById(id: number): Promise<BoardEntity> {

        // await this.boardRepository.findOne(id)는 안된다.
        const found = await this.boardRepository.findOne({
            where: { id: id },
        });
        if (!found) {
            throw new NotFoundException(`No Board found with id ${id}`);
        }

        return found;
    }

    async createBoard(createBoardDto: CreateBoardDto): Promise<BoardEntity> {
        const { title, description } = createBoardDto;
        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        })

        await this.boardRepository.save(board);

        return board;
    }

    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardRepository.delete(id);

        console.log('result ', result);
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<BoardEntity> {
        const board = await this.getBoardById(id);
        board.status = status;
        await this.boardRepository.save(board);
        return board;
    }
}
