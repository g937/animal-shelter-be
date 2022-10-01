import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ApplyEntity } from "../database/entities/apply.entity";
import { ApplyController } from "./apply.controller";
import { ApplyService } from "./apply.service";

@Module({
  imports: [TypeOrmModule.forFeature([ApplyEntity])],
  controllers: [ApplyController],
  providers: [ApplyService],
  exports: [ApplyService],
})
export class ApplyModule {}