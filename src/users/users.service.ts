import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { hash } from 'bcrypt';

import { UserEntity } from "../database/entities/user.entity";
import { CreateUserDto } from "./create-user.dto";
import { SuccessResponseDto } from "../common/success-response.dto";
import { UpdateUserDto } from "./update-user.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
    ) { }

    async registration(data: CreateUserDto): Promise<SuccessResponseDto> {
        const user = await this.findOneByEmail(data.email);

        if (user) {
            throw new BadRequestException('USER_ALREADY_EXISTS');
        } else {
            data.password = await hash(data.password, 10);
            await this.usersRepository.save({ imageUrl: '', ...data });
        }

        return { success: 'Ok' };
    }

    async findOneByEmail(email: string): Promise<UserEntity> {
        return this.usersRepository.findOne({ where: { email } });
    }

    async findOne(id: number): Promise<UserEntity> {
        const user = await this.usersRepository.findOne({ where: { id } });

        if (!user) {
            throw new BadRequestException('NOT_FOUND');
        }

        return user;
    }

    async findPasswordByEmail(email: string) {
        const user = await this.usersRepository.findOne({
            where: { email },
            select: ['password'],
        });

        return user?.password;
    }

    async modify(id: number, data: UpdateUserDto): Promise<UserEntity> {
        await this.findOne(id);
        await this.usersRepository.update(id, data);
        return this.usersRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.findOne(id);
        await this.usersRepository.delete(id);
    }
}
