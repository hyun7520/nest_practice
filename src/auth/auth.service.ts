import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) { }

    async signUp(authCredentialDto: AuthCredentialDto): Promise<UserEntity> {
        return this.userRepository.createUser(authCredentialDto);
    }

    async signIn(authCredentialDto: AuthCredentialDto): Promise<string> {
        const { username, password } = authCredentialDto;
        const user = await this.userRepository.findOne({
            where: { username: username }
        });
        if (user && (await bcrypt.compare(password, user.password))) {
            return 'login success';
        }
        else {
            throw new UnauthorizedException('login failed')
        }
    }
}
