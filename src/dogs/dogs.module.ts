import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DogEntity } from '../database/entities/dog.entity';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';
import { WalkEntity } from "../database/entities/walk.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DogEntity, WalkEntity])],
  controllers: [DogsController],
  providers: [DogsService],
  exports: [DogsService],
})
export class DogsModule {}
