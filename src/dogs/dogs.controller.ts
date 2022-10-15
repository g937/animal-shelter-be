import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Delete
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { DogEntity } from '../database/entities/dog.entity';
import { DogDto } from './dto/create-dog.dto';
import { DogsService } from './dogs.service';

@Controller('/dogs')
@ApiBearerAuth()
@ApiTags('Dogs')
export class DogsController {
    constructor(
        private readonly dogsService: DogsService,
    ) { }

    @Post()
    async create(@Body() data: DogDto): Promise<DogEntity> {
        return this.dogsService.create(data);
    }

    @Get()
    async getAll(): Promise<DogEntity[]> {
        return this.dogsService.getAll();
    }

    @Get('/:id')
    async findOne(@Param('id') id: number): Promise<DogEntity> {
        return this.dogsService.getOne(id);
    }

    @Patch('/:id')
    async modify(@Param('id') id: number, @Body() data: DogDto): Promise<DogEntity> {
        return this.dogsService.modify(id, data);
    }

    @Delete('/:id')
    async delete(@Param('id') id: number): Promise<void> {
        await this.dogsService.delete(id);
    }
}
