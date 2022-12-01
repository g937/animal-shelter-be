import { ApiHideProperty } from '@nestjs/swagger';

import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { GenderEnum } from '../../common/gender.enum';
import { ApplyEntity } from './apply.entity';
import { AdoptionEntity } from './adoption.entity';
import { WalkEntity } from "./walk.entity";

@Entity({ name: 'dog' })
export class DogEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'breed', type: 'varchar' })
  breed: string;

  @Column({ name: 'gender',  type: 'enum', enum: GenderEnum })
  gender: GenderEnum;

  @Column({ name: 'castrated',  type: 'boolean' })
  castrated: boolean;

  @Column({ name: 'color', type: 'varchar' })
  color: string;

  @Column({ name: 'birth_date', type: 'date' })
  birthDate: Date;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({ name: 'image_url', type: 'text' })
  imageUrl: string;

  @Column({ name: 'adopted',  type: 'boolean', default: false })
  adopted: boolean;

  @ApiHideProperty()
  @OneToMany(() => ApplyEntity, (apply: ApplyEntity) => apply.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  applies?: ApplyEntity[];

  @ApiHideProperty()
  @OneToMany(() => AdoptionEntity, (adoption: AdoptionEntity) => adoption.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  adoptions?: AdoptionEntity[];

  @ApiHideProperty()
  @OneToMany(() => WalkEntity, (walk: WalkEntity) => walk.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  walks?: WalkEntity[];
}