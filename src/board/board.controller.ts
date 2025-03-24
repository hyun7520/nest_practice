import { Body, Controller, Delete, Get, Param, Post, Patch, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { BoardStatus } from './board-status.enum'
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe'
import { BoardEntity } from './board.entitiy';

@Controller('board')
export class BoardController {
    // // constructor안에서 DI가 이루어짐
    // // JavaScript에서 사용 불가한 접근 제한자를 사용 가능하게 해준다.
    constructor(private boardService: BoardService) { }

    // @Get()
    // // return 값을 맞춰주지 않으면 에러 발생 -> spring과 동일
    // // 타입 정의는 선택사항이지만 코드를 읽은 입장에서 이해하시 쉬우며,
    // // 필요한 타입을 명시함으로 에러를 쉽게 찾아내고 대처가 가능
    // getAllBoard(): Board[] {
    //     return this.boardService.getAllBoards();
    // }

    // @Get('/:id')
    // // 파라미터가 두개 이상일 경우 
    // // @Param() parms: string[] -> 배열 형태로 가져올 수 있다.
    // getBoardById(@Param('id') id: string): Board {
    //     return this.boardService.getBoardById(id);
    // }

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<BoardEntity> {
        return this.boardService.getBoardById(id);
    }

    @Get()
    getAllBoard(): Promise<BoardEntity[]> {
        return this.boardService.getAllBoards();
    }

    // @Post()
    // // DTO에 넣어준 validation을 확인하기 위해 핸들러 레벨에서 ValidationPipe 바인딩
    // @UsePipes(ValidationPipe)
    // // Body에서 특정값만 받아오려고 할 경우
    // // @Body('title') title: string,
    // // @Body('description') description: string
    // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    //     return this.boardService.createBoard(createBoardDto);
    // }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto): Promise<BoardEntity> {
        return this.boardService.createBoard(createBoardDto);
    }

    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') id: string,
    //     @Body('status', BoardStatusValidationPipe) status: BoardStatus) {
    //     return this.boardService.updateBoard(id, status);
    // }

    // @Delete('/:id')
    // deleteBoard(@Param('id') id: string): void {
    //     this.boardService.deleteBoardById(id);
    // }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id): Promise<void> {
        return this.boardService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus) {

        return this.boardService.updateBoardStatus(id, status);
    }

}
