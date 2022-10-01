import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AdoptionEntity } from "../database/entities/adoption.entity";
import { AdoptionController } from "./adoption.controller";
import { AdoptionService } from "./adoption.service";

@Module({
  imports: [TypeOrmModule.forFeature([AdoptionEntity])],
  controllers: [AdoptionController],
  providers: [AdoptionService],
  exports: [AdoptionService],
})
export class AdoptionModule {}