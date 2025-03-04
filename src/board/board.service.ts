import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardService {
    // 배열일 경우 배열로 맞춰준다.
    private boards: Board[] = [];

    // 모든 게시판 조회: 타입을 똑같이 정의
    getAllBoards(): Board[] {
        return this.boards;
    }

    createBoard(createBoardDto: CreateBoardDto): Board {
        const { title, description } = createBoardDto;
        const board: Board = {
            // title: title,
            // description: description,
            // 명칭이 동일할 경우 생략가능
            id: uuid(),
            title,
            description,
            status: BoardStatus.PUBLIC,
        }

        // 새로운 게시물을 입력
        this.boards.push(board);
        return board;
    }

    getBoardById(id: string): Board {
        // 끝에 !을 붙임으로써 non-null assertion operator 역할을 한다.
        // null일 것 같은 값이어도 확정적으로 값이 있음을 선언하는 건데 게시판이 없는 경우 예외 처리는?
        // const foundBoard: Board = this.boards.find((board) => board.id === id)!;
        const foundBoard: Board = this.boards.find((board) => board.id == id) || undefined;
        if (foundBoard == undefined) {
            return null;
        }
        return foundBoard;
    }
}
