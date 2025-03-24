import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) { }

    async signUp(authCredentialDto: AuthCredentialDto): Promise<UserEntity> {
        return this.userRepository.createUser(authCredentialDto);
    }
}
