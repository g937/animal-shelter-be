import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { TokenDto } from '../dto/token.dto';
import { UserEntity } from '../../database/entities/user.entity'
import { UsersService } from '../../users/users.service';

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy, 'token') {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: TokenDto): Promise<UserEntity> {
    return this.usersService.findOne(payload.id);
  }
}