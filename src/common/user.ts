import { UserEntity } from '../database/entities/user.entity';

declare module 'express' {
  export interface Request {
    user: UserEntity;
  }
}