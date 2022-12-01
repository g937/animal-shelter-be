import { Controller, Post, Body, Get, UseGuards, Req, Patch, Delete, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Request } from 'express';

import { UserEntity } from '../database/entities/user.entity';
import { SuccessResponseDto } from '../common/success-response.dto';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './update-user.dto';
import { RoleGuard } from '../auth/guards/role.guard';
import { RoleEnum } from '../common/role.enum';

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
  @UseGuards(RoleGuard([RoleEnum.ADMIN, RoleEnum.USER]))
  async getProfile(@Req() request: Request): Promise<UserEntity> {
    return this.usersService.findOne(request.user.id);
  }

  @Get('/:id')
  @UseGuards(RoleGuard([RoleEnum.ADMIN, RoleEnum.USER]))
  async getOne(@Param('id') id: number): Promise<UserEntity> {
    return this.usersService.findOne(id);
  }

  @Patch('/:id')
  @UseGuards(RoleGuard([RoleEnum.ADMIN, RoleEnum.USER]))
  async modify(@Param('id') id: number, @Body() data: UpdateUserDto): Promise<UserEntity> {
    return this.usersService.modify(id, data);
  }

  @Delete('/:id')
  @UseGuards(RoleGuard([RoleEnum.ADMIN]))
  async delete(@Param('id') id: number): Promise<void> {
    await this.usersService.delete(id);
  }
}