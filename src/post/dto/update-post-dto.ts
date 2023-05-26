/* eslint-disable prettier/prettier */
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class UpdatePostDto {

    content: string;
    image: string;
}