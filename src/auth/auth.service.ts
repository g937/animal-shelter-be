import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserEntity } from '../database/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login(user: UserEntity) {
    const accessToken = this.jwtService.sign({
      sub: user.id,
    });

    return {
      accessToken,
    };
  }
}