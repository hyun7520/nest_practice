import { DataSource, Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { AuthCredentialDto } from "./dto/auth-credentials.dto";

@Injectable()
export class UserRepository extends Repository<UserEntity> {

    constructor(dataSource: DataSource) {
        super(UserEntity, dataSource.createEntityManager());
    }

    async createUser(authCredentialDto: AuthCredentialDto): Promise<UserEntity> {

        const { username, password } = authCredentialDto;
        const user = this.create({ username, password });
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