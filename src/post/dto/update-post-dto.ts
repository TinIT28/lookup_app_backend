/* eslint-disable prettier/prettier */
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class UpdatePostDto {

    @IsNotEmpty()
    @IsString()
    readonly content: string;

    @IsArray()
    readonly images: string[];
}