import { IsNotEmpty } from "class-validator";

// 클래스는 인터페이스와 다르게 런타임에서 작동
// 파이프 기능으로 이용할 때 더 유용하다.
export class CreateBoardDto {
    // 빈값에 대한 유효성 체크
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}