import { Controller, Post, Body, Get, UseGuards, Req, Patch, Delete, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Request } from 'express';

import { TokenGuard } from '../auth/guards/token.guard';
import { UserEntity } from '../database/entities/user.entity';
import { SuccessResponseDto } from '../common/success-response.dto';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './update-user.dto';

@ApiTags('User')
@Controller('/user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Post('/registration')
  async registration(@Body() data: CreateUserDto): Promise<SuccessResponseDto> {
    return this.usersService.registration(data);
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  async getProfile(@Req() request: Request): Promise<UserEntity> {
    return this.usersService.findOne(request.user.id);
  }

  @Get('/:id')
  async getOne(@Param('id') id: number): Promise<UserEntity> {
    return this.usersService.findOne(id);
  }

  @Patch('/:id')
  async modify(@Param('id') id: number, @Body() data: UpdateUserDto): Promise<UserEntity> {
    return this.usersService.modify(id, data);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.usersService.delete(id);
  }
}