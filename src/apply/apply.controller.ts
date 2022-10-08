import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { Request } from 'express';

import { ApplyService } from "./apply.service";
import { ApplyEntity } from "../database/entities/apply.entity";
import { ApplyDto } from "./dto/apply.dto";
import { TokenGuard } from "../auth/guards/token.guard";

@Controller('/apply')
@ApiBearerAuth()
@ApiTags('Apply')
export class ApplyController {
  constructor(
    private readonly applyService: ApplyService
  ) { }

  @Post()
  @UseGuards(TokenGuard)
  async create(@Body() data: ApplyDto, @Req() request: Request): Promise<ApplyEntity> {
    return this.applyService.create(data, request);
  }

  @Get()
  async getAll(): Promise<ApplyEntity[]> {
    return this.applyService.getAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<ApplyEntity> {
    return this.applyService.getOne(id);
  }

  @Patch('/:id')
  async modify(@Param('id') id: number, @Body() data: ApplyDto): Promise<ApplyEntity> {
    return this.applyService.modify(id, data);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.applyService.delete(id);
  }
}