import { Injectable } from '@nestjs/common';
import { Board } from './board.model';

@Injectable()
export class BoardService {
    // 배열일 경우 배열로 맞춰준다.
    private board: Board[] = [];

    // 모든 게시판 조회: 타입을 똑같이 정의
    getAllBoards(): Board[] {
        return this.board;
    }
}
