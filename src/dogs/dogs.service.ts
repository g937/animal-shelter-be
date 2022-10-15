import {
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

import { DogEntity } from "../database/entities/dog.entity";
import { DogDto } from "./dto/create-dog.dto";

@Injectable()
export class DogsService {
  constructor(
    @InjectRepository(DogEntity)
    private readonly dogsRepository: Repository<DogEntity>
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
}  