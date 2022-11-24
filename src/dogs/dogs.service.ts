import {
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { Request } from "express";

import { DogEntity } from "../database/entities/dog.entity";
import { DogDto } from "./dto/create-dog.dto";
import { WalkDto } from "./dto/walk.dto";
import { WalkEntity } from "../database/entities/walk.entity";

@Injectable()
export class DogsService {
  constructor(
    @InjectRepository(DogEntity)
    private readonly dogsRepository: Repository<DogEntity>,
    @InjectRepository(WalkEntity)
    private readonly walkRepository: Repository<WalkEntity>,
  ) {
  }

  async create(dog: DogDto): Promise<DogEntity> {
    return this.dogsRepository.save(dog);
  }

  async getAll(): Promise<DogEntity[]> {
    return this.dogsRepository.find({ where: {adopted: false}});
  }

  async getOne(id: number): Promise<DogEntity> {
    const dog = await this.dogsRepository.findOne({ where: { id } });

    if (!dog) {
      throw new NotFoundException("NOT_FOUND");
    }

    return dog;
  }

  async modify(id: number, data: DogDto): Promise<DogEntity> {
    await this.getOne(id);
    await this.dogsRepository.update(id, data);
    return this.dogsRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.getOne(id);
    await this.dogsRepository.delete(id);
  }

  async createWalk(dogId: number, data: WalkDto, req: Request): Promise<WalkEntity> {
    return this.walkRepository.save({dogId, userId: req.user.id, ...data});
  }
}  