import { ApiHideProperty } from "@nestjs/swagger";

import { IsString } from "class-validator";

export class ApplyDto {
  @IsString()
  introduction: string;

  @ApiHideProperty()
  accepted: boolean;
}