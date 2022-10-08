import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { AdoptionService } from "./adoption.service";
import { AdoptionEntity } from "../database/entities/adoption.entity";
import { AdoptionDto } from "./dto/adoption.dto";
import { AdoptionResultDto } from "./dto/adoption-result.dto";

@Controller('/adoption')
@ApiBearerAuth()
@ApiTags('Adoption')
export class AdoptionController {
  constructor(
    private readonly adoptionService: AdoptionService
  ) { }

  @Post()
  async create(@Body() data: AdoptionDto): Promise<AdoptionEntity> {
    return this.adoptionService.create(data);
  }

  @Get()
  async getAll(): Promise<AdoptionResultDto[]>  {
    return this.adoptionService.getAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<AdoptionEntity> {
    return this.adoptionService.getOne(id);
  }

  @Patch('/:id')
  async modify(@Param('id') id: number, @Body() data: AdoptionDto): Promise<AdoptionEntity> {
    return this.adoptionService.modify(id, data);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.adoptionService.delete(id);
  }
}