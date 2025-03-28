import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { UserEntity } from './user.entity';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/signup')
    signUp(@Body() authCredentialDto: AuthCredentialDto): Promise<UserEntity> {
        return this.authService.signUp(authCredentialDto);
    }
}
