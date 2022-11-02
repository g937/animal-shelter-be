import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { Request } from 'express';

import { AuthService } from './auth.service';
import { LoginDto } from '../auth/dto/login.dto';
import { LocalGuard } from './guards/local.guard';
import { TokenResponseDto } from "./dto/token-response.dto";

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  @ApiBody({ type: LoginDto, required: true })
  @UseGuards(LocalGuard)
  login(@Req() request: Request): TokenResponseDto {
    const user = request.user;
    return this.authService.login(user);
  }

  @Post('logout')
  logout(): void {}

}