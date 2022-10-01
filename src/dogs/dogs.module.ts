import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DogEntity } from '../database/entities/dog.entity';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';

@Module({
  imports: [TypeOrmModule.forFeature([DogEntity])],
  controllers: [DogsController],
  providers: [DogsService],
  exports: [DogsService],
})
export class DogsModule {}
