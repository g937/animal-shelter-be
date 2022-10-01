import { IsString, IsBoolean, IsDateString, IsEnum } from 'class-validator';

import { AdoptionTypeEnum } from '../../common/adoption-type.enum';
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

    @IsEnum(AdoptionTypeEnum)
    adoptionType: AdoptionTypeEnum;

    @IsString()
    imageUrl: string;
}  