import { IsString, IsNumberString, Length } from "class-validator";

export class UpdateUserDto {

    @IsString()
    name: string;

    @IsNumberString()
    @Length(11, 11, { message: 'O telefone deve ter 11 dígitos' })
    phone: string;
}