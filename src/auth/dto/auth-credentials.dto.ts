import { IsString, MaxLength, MinLength, Matches } from "class-validator";

export class AuthCredentialDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    // 영어랑 숫자만
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: '비밀번호는 영어나 숫자만 입력 가능'
    })
    password: string;
}