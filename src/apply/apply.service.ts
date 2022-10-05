import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

import { ApplyEntity } from "../database/entities/apply.entity";
import { ApplyDto } from "./dto/apply.dto";

@Injectable()
export class ApplyService {
  constructor(
    @InjectRepository(ApplyEntity)
    private readonly applyRepository: Repository<ApplyEntity>
  ) {
  }

  async create(apply: ApplyDto): Promise<ApplyEntity> {
    apply.accepted = false;
    return this.applyRepository.save(apply);
  }

  async getAll(): Promise<ApplyEntity[]> {
    return this.applyRepository.find();
  }

  async getOne(id: number): Promise<ApplyEntity> {
    const adoption = await this.applyRepository.findOne({ where: { id } });

    if (!adoption) {
      throw new NotFoundException("NOT_FOUND");
    }

    return adoption;
  }

  async modify(id: number, data: ApplyDto): Promise<ApplyEntity> {
    await this.getOne(id);
    await this.applyRepository.update(id, data);
    return this.applyRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.getOne(id);
    await this.applyRepository.delete(id);
  }
}