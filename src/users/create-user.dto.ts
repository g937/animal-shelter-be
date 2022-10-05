import {
    IsEmail,
    IsString,
    Matches,
    MaxLength,
    MinLength,
  } from 'class-validator';
  
  import { Match } from '../common/match.decorator';
  
  export class CreateUserDto {
    @IsString()
    name: string;
  
    @IsEmail()
    email: string;
  
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(
      /^.*(?=.{8,})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1})((?=.*[0-9]){1}).*$/,
      { message: 'password too weak' },
    )
    password: string;
  
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Match('password', { message: 'passwords match' })
    confirmPassword: string;
  }  