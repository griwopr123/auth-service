import { IsNotEmpty, MaxLength, MinLength, IsEmail } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6) @MaxLength(16) password: string;
}