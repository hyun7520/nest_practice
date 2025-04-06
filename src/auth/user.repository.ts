import { DataSource, Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { AuthCredentialDto } from "./dto/auth-credentials.dto";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository extends Repository<UserEntity> {

    constructor(dataSource: DataSource) {
        super(UserEntity, dataSource.createEntityManager());
    }

    async createUser(authCredentialDto: AuthCredentialDto): Promise<UserEntity> {

        const { username, password } = authCredentialDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({ username, password: hashedPassword });
        try {
            await this.save(user);
        }
        catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Existing username')
            } else {
                throw new InternalServerErrorException();
            }
        }
        return user;
    }
}