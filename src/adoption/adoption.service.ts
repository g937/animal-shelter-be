import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { Request } from "express";

import { AdoptionEntity } from "../database/entities/adoption.entity";
import { AdoptionDto } from "./dto/adoption.dto";
import { DogEntity } from "../database/entities/dog.entity";
import { AdoptionResultDto } from "./dto/adoption-result.dto";

@Injectable()
export class AdoptionService {
  constructor(
    @InjectRepository(AdoptionEntity)
    private readonly adoptionRepository: Repository<AdoptionEntity>,
    @InjectRepository(DogEntity)
    private readonly dogsRepository: Repository<DogEntity>
  ) {
  }

  async create(req: Request, adoption: AdoptionDto): Promise<AdoptionEntity> {
    const dog = await this.dogsRepository.findOne({ where: { id: adoption.dogId}});
    dog.adopted = true;
    await this.dogsRepository.update(dog.id, dog);
    return this.adoptionRepository.save({ userId: req.user.id, ...adoption});
  }

  async getAll(): Promise<AdoptionResultDto[]> {
    const dogs = await this.dogsRepository.find();
    const adoption = await this.adoptionRepository.find();

    const result = adoption.map((adoption) => {
      const dog = dogs.find((dog) => {
        return +dog.id === adoption.dogId;
      });
      return { name: dog.name, image: dog.imageUrl, date: adoption.date };
    })
    return result;
  }

  async getOne(id: number): Promise<AdoptionEntity> {
    const adoption = await this.adoptionRepository.findOne({ where: { id } });

    if (!adoption) {
      throw new NotFoundException("NOT_FOUND");
    }

    return adoption;
  }

  async modify(id: number, data: AdoptionDto): Promise<AdoptionEntity> {
    await this.getOne(id);
    await this.adoptionRepository.update(id, data);
    return this.adoptionRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.getOne(id);
    await this.adoptionRepository.delete(id);
  }
}