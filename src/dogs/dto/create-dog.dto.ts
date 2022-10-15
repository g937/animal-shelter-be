import { IsString, IsBoolean, IsDateString, IsEnum } from 'class-validator';

import { GenderEnum } from '../../common/gender.enum';

export class DogDto {
    @IsString()
    name: string;

    @IsString()
    breed: string;

    @IsEnum(GenderEnum)
    gender: GenderEnum;

    @IsBoolean()
    castrated: boolean;

    @IsString()
    color: string;

    @IsDateString()
    birthDate: Date;

    @IsString()
    description: string;

    @IsString()
    imageUrl: string;
}  