import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardService {
    // 배열일 경우 배열로 맞춰준다.
    private board: Board[] = [];

    // 모든 게시판 조회: 타입을 똑같이 정의
    getAllBoards(): Board[] {
        return this.board;
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
        this.board.push(board);
        return board;
    }
}
