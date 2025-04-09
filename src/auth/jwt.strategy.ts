import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import { UserEntity } from "./user.entity";

// yarn add @types/passport-jwt --save
// Strategy는 Passport-jwt에서 가져온다
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            secretOrKey: process.env.JWT_SECRET!,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload) {
        const { username } = payload;
        const user: UserEntity | null = await this.userRepository.findOne({
            where: { username: username },
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}