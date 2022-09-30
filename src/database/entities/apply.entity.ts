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

@Entity({ name: 'apply' })
export class ApplyEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @Column({ name: 'dog_id', type: 'int' })
  dogId: number;

  @Column({ name: 'introduction', type: 'text' })
  introduction: string;

  @Column({ name: 'accepted', type: 'boolean' })
  accepted: boolean;

  @ApiHideProperty()
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @ApiHideProperty()
  @ManyToOne(() => DogEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'dog_id' })
  dog?: DogEntity;
}