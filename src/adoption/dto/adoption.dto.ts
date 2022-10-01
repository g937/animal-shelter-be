import { IsDateString, IsNumber } from "class-validator";

export class AdoptionDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  dogId: number;

  @IsDateString()
  date: Date;
}