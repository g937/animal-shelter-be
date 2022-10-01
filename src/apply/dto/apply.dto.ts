import { ApiHideProperty } from "@nestjs/swagger";

import { IsNumber, IsString } from "class-validator";

export class ApplyDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  dogId: number;

  @IsString()
  introduction: string;

  @ApiHideProperty()
  accepted: boolean;
}