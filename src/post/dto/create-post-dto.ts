/* eslint-disable prettier/prettier */

import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { ObjectId } from "mongoose";
import { User } from "src/user/schema/user.schema";

export class CreatePostDto {

    @IsNotEmpty()
    @IsString()
    readonly content: string;

    @IsArray()
    readonly images: string[];

    user: ObjectId;

    readonly likes: ObjectId[];
}