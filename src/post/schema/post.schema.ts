/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { User } from "src/user/schema/user.schema";

@Schema({
    timestamps: true
})
export class Posts {

    @Prop()
    content: string;

    @Prop([String])
    images: string[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: mongoose.ObjectId;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    likes: mongoose.ObjectId[];


}

export const PostsSchema = SchemaFactory.createForClass(Posts);