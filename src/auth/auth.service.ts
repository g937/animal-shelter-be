import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserEntity } from '../database/entities/user.entity';
import { TokenResponseDto } from "./dto/token-response.dto";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) { }

  login(user: UserEntity): TokenResponseDto {
    const accessToken = this.jwtService.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      token: accessToken,
    }
  }
}