import { IsNotEmpty, IsEmail, MinLength, MaxLength, IsOptional, IsString } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6) @MaxLength(16) password: string;

    @IsOptional()
    @IsString()
    firstName?: string;

    @IsOptional()
    @IsString()
    lastName?: string;
}