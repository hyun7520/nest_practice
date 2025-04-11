import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserEntity } from "./user.entity";

export const GetUser = createParamDecorator((data, ctx: ExecutionContext): UserEntity => {
    // ctx = Execution Context
    // 현재 데코레이터가 실행되고 있는 환경에 대한 정보가 담겨있다.
    const req = ctx.switchToHttp().getRequest();
    return req.user;
})