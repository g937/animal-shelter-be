import { ApiHideProperty } from '@nestjs/swagger';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { DogEntity } from './dog.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'adoption' })
export class AdoptionEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @Column({ name: 'dog_id', type: 'int' })
  dogId: number;

  @Column({ name: 'date', type: 'date' })
  date: Date;

  @ApiHideProperty()
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @ApiHideProperty()
  @ManyToOne(() => DogEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'dog_id' })
  dog?: DogEntity;
}