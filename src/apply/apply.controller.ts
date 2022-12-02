import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { Request } from 'express';

import { ApplyService } from "./apply.service";
import { ApplyEntity } from "../database/entities/apply.entity";
import { ApplyDto } from "./dto/apply.dto";
import { RoleGuard } from "../auth/guards/role.guard";
import { RoleEnum } from "../common/role.enum";

@Controller('/apply')
@ApiBearerAuth()
@ApiTags('Apply')
export class ApplyController {
  constructor(
    private readonly applyService: ApplyService
  ) { }

  @Post('/:id')
  @UseGuards(RoleGuard([RoleEnum.USER]))
  async create(@Param('id') dogId: number, @Body() data: ApplyDto, @Req() request: Request): Promise<ApplyEntity> {
    return this.applyService.create(dogId, data, request);
  }

  @Get()
  @UseGuards(RoleGuard([RoleEnum.ADMIN]))
  async getAll(): Promise<ApplyEntity[]> {
    return this.applyService.getAll();
  }

  @Get('/:id')
  @UseGuards(RoleGuard([RoleEnum.ADMIN]))
  async findOne(@Param('id') id: number): Promise<ApplyEntity> {
    return this.applyService.getOne(id);
  }

  @Patch('/:id')
  @UseGuards(RoleGuard([RoleEnum.ADMIN, RoleEnum.USER]))
  async modify(@Param('id') id: number, @Body() data: ApplyDto): Promise<ApplyEntity> {
    return this.applyService.modify(id, data);
  }

  @Delete('/:id')
  @UseGuards(RoleGuard([RoleEnum.ADMIN, RoleEnum.USER]))
  async delete(@Param('id') id: number): Promise<void> {
    await this.applyService.delete(id);
  }
}