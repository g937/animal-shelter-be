import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { TokenStrategy } from './strategies/token.strategy';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get('EXPIRES_IN'),
          },
        };
      },
      imports: [ConfigModule],
    }),
  ],
  providers: [LocalStrategy, TokenStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}