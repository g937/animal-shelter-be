import { RoleEnum } from "../../common/role.enum";

export class TokenDto {
    id: number;
    email: string;
    role: RoleEnum;
}  