import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { Strategy } from 'passport-local';
import { compare } from 'bcrypt';

import { UsersService } from '../../users/users.service';
import { throwIfNotExits } from '../../common/throw-if-not-exists';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly userService: UsersService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    const userPassword = await this.userService.findPasswordByEmail(email);

    throwIfNotExits(userPassword);

    const isValidPassword = await compare(password, userPassword);

    throwIfNotExits(isValidPassword);

    const user = await this.userService.findOneByEmail(email);

    throwIfNotExits(user);

    return user;
  }
}