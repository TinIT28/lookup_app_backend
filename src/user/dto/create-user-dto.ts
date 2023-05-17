/* eslint-disable prettier/prettier */
import { IsString, IsEmail, IsNotEmpty, MinLength, IsPhoneNumber } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    readonly password: string;

    hashPassword: string;

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    readonly image: string;

    @IsPhoneNumber('VN')
    @IsString()
    @IsNotEmpty()
    readonly phoneNumber: string;

    @IsString()
    readonly description: string;

    @IsString()
    @IsNotEmpty()
    readonly province: string;

    @IsString()
    @IsNotEmpty()
    readonly city: string;

    @IsString()
    @IsNotEmpty()
    readonly district: string;
}