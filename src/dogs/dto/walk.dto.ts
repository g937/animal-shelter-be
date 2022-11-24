import { IsDateString } from "class-validator";

export class WalkDto {
  @IsDateString()
  date: Date;
}