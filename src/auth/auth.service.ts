import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) { }

    async signUp(authCredentialDto: AuthCredentialDto): Promise<UserEntity> {
        return this.userRepository.createUser(authCredentialDto);
    }

    async signIn(authCredentialDto: AuthCredentialDto): Promise<{ accessToken: string }> {
        const { username, password } = authCredentialDto;
        const user = await this.userRepository.findOne({
            where: { username: username }
        });
        if (user && (await bcrypt.compare(password, user.password))) {
            // 사용자 토큰 생성 secret + payload
            const payload = { username };
            const accessToken = await this.jwtService.sign(payload);

            return { accessToken: };
        }
        else {
            throw new UnauthorizedException('login failed')
        }
    }
}
