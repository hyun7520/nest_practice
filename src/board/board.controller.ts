import { Body, Controller, Get, Post } from '@nestjs/common';
import { Board } from './board.model'
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('board')
export class BoardController {
    // constructor안에서 DI가 이루어짐
    // JavaScript에서 사용 불가한 접근 제한자를 사용 가능하게 해준다.
    constructor(private boardService: BoardService) { }

    @Get()
    // return 값을 맞춰주지 않으면 에러 발생 -> spring과 동일
    // 타입 정의는 선택사항이지만 코드를 읽은 입장에서 이해하시 쉬우며,
    // 필요한 타입을 명시함으로 에러를 쉽게 찾아내고 대처가 가능
    getAllBoard(): Board[] {
        return this.boardService.getAllBoards();
    }

    @Post()
    // Body에서 특정값만 받아오려고 할 경우
    // @Body('title') title: string,
    // @Body('description') description: string
    createBoard(@Body() createBoardDto: CreateBoardDto): Board {
        return this.boardService.createBoard(createBoardDto);
    }
}
