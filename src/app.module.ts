import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Config } from './config';
import { DogsModule } from './dogs/dogs.module';
import { AdoptionModule } from "./adoption/adoption.module";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRoot(Config.getOrmConfig()), DogsModule, AdoptionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
