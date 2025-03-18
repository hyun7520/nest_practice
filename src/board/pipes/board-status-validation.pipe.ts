import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board-status.enum";

// 모든 파이프에는 PipeTransform이 있어야 한다
export class BoardStatusValidationPipe implements PipeTransform {

    // readonly - 외부에서 접근은 가능, 값 변경은 불가능
    readonly StatusOptions = [
        BoardStatus.PRIVATE,
        BoardStatus.PUBLIC
    ]


    // metadata는 당장 사용하지 않으므로 제외
    transform(value: any) {
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} is not valid option`);
        }

        return value;
    }

    private isStatusValid(status: any) {
        const index = this.StatusOptions.indexOf(status);
        // index사 유효하면 PRIVATE이나 PUBLIC의 인덱스 값이 0 또는 1이 출력
        // 거짓일 경우 -1
        return index !== -1;
    }
}