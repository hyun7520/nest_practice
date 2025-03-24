import { DataSource, Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { Injectable } from "@nestjs/common";
import { AuthCredentialDto } from "./dto/auth-credentials.dto";

@Injectable()
export class UserRepository extends Repository<UserEntity> {

    constructor(dataSource: DataSource) {
        super(UserEntity, dataSource.createEntityManager());
    }

    async createUser(authCredentialDto: AuthCredentialDto): Promise<UserEntity> {

        const { username, password } = authCredentialDto;
        const user = this.create({ username, password });
        await this.save(user);
        return user;
    }
}