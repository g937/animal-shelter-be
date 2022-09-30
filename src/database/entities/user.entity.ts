import { ApiHideProperty } from '@nestjs/swagger';

import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AdoptionEntity } from './adoption.entity';
import { ApplyEntity } from './apply.entity';

@Index('UQ_user_email', ['email'], { unique: true })
@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'email', type: 'varchar' })
  email: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @Column({ name: 'image_url', type: 'text' })
  imageUrl: string;

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
}