import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Delete, Req, UseGuards
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Request } from "express";

import { DogEntity } from '../database/entities/dog.entity';
import { DogDto } from './dto/create-dog.dto';
import { DogsService } from './dogs.service';
import { WalkDto } from "./dto/walk.dto";
import { WalkEntity } from "../database/entities/walk.entity";
import { RoleGuard } from "../auth/guards/role.guard";
import { RoleEnum } from "../common/role.enum";

@Controller('/dogs')
@ApiBearerAuth()
@ApiTags('Dogs')
export class DogsController {
    constructor(
        private readonly dogsService: DogsService,
    ) { }

    @Post()
    @UseGuards(RoleGuard([RoleEnum.ADMIN]))
    async create(@Body() data: DogDto): Promise<DogEntity> {
        return this.dogsService.create(data);
    }

    @Get()
    async getAll(): Promise<DogEntity[]> {
        return this.dogsService.getAll();
    }

    @Get('/:id')
    @UseGuards(RoleGuard([RoleEnum.ADMIN, RoleEnum.USER]))
    async findOne(@Param('id') id: number): Promise<DogEntity> {
        return this.dogsService.getOne(id);
    }

    @Patch('/:id')
    @UseGuards(RoleGuard([RoleEnum.ADMIN]))
    async modify(@Param('id') id: number, @Body() data: DogDto): Promise<DogEntity> {
        return this.dogsService.modify(id, data);
    }

    @Delete('/:id')
    @UseGuards(RoleGuard([RoleEnum.ADMIN]))
    async delete(@Param('id') id: number): Promise<void> {
        await this.dogsService.delete(id);
    }

    @Post('/:id/walk')
    @UseGuards(RoleGuard([RoleEnum.ADMIN, RoleEnum.USER]))
    async createWalk(@Param('id') dogId: number, @Body() data: WalkDto, @Req() request: Request): Promise<WalkEntity> {
        return this.dogsService.createWalk(dogId, data, request);
    }
}
