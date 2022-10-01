import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

import { AdoptionEntity } from "../database/entities/adoption.entity";
import { AdoptionDto } from "./dto/adoption.dto";

@Injectable()
export class AdoptionService {
  constructor(
    @InjectRepository(AdoptionEntity)
    private readonly adoptionRepository: Repository<AdoptionEntity>
  ) {
  }

  async create(adoption: AdoptionDto): Promise<AdoptionEntity> {
    return this.adoptionRepository.save(adoption);
  }

  async getAll(): Promise<AdoptionEntity[]> {
    return this.adoptionRepository.find();
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