import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    // yarn add @nestjs/jwt @nestjs/passport passport passport-jwt --save
    // Jwt를 사용하기 위해 명령어로 모듈 설치 먼저
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '3600s' },
      }),
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  // 현재 모듈(auth)에서 사용할 수 있도록 설정
  providers: [AuthService, UserRepository, JwtStrategy],
  // 다른 모듈에서도 사용할 수 있도록 설정
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule { }
