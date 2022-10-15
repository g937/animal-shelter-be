import { IsDateString, IsNumber } from "class-validator";

export class AdoptionDto {
  @IsNumber()
  dogId: number;

  @IsDateString()
  date: Date;
}