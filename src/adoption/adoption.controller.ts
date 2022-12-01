import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { Request } from 'express';

import { AdoptionService } from "./adoption.service";
import { AdoptionEntity } from "../database/entities/adoption.entity";
import { AdoptionDto } from "./dto/adoption.dto";
import { AdoptionResultDto } from "./dto/adoption-result.dto";
import { RoleGuard } from "../auth/guards/role.guard";
import { RoleEnum } from "../common/role.enum";

@Controller('/adoption')
@ApiBearerAuth()
@ApiTags('Adoption')
export class AdoptionController {
  constructor(
    private readonly adoptionService: AdoptionService
  ) { }

  @Post()
  @UseGuards(RoleGuard([RoleEnum.ADMIN]))
  async create(@Req() req: Request, @Body() data: AdoptionDto): Promise<AdoptionEntity> {
    return this.adoptionService.create(req, data);
  }

  @Get()
  async getAll(): Promise<AdoptionResultDto[]>  {
    return this.adoptionService.getAll();
  }

  @Get('/:id')
  @UseGuards(RoleGuard([RoleEnum.ADMIN]))
  async findOne(@Param('id') id: number): Promise<AdoptionEntity> {
    return this.adoptionService.getOne(id);
  }

  @Patch('/:id')
  @UseGuards(RoleGuard([RoleEnum.ADMIN]))
  async modify(@Param('id') id: number, @Body() data: AdoptionDto): Promise<AdoptionEntity> {
    return this.adoptionService.modify(id, data);
  }

  @Delete('/:id')
  @UseGuards(RoleGuard([RoleEnum.ADMIN]))
  async delete(@Param('id') id: number): Promise<void> {
    await this.adoptionService.delete(id);
  }
}