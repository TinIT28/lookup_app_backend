/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import bcrypt from 'bcrypt';

@Schema({
    timestamps: true,
})
export class User {

    @Prop({ unique: [true, 'Duplicate email entered'] })
    email: string;

    password: string

    @Prop()
    hashPassword: string

    @Prop()
    name: string;

    @Prop()
    image: string;

    @Prop()
    phoneNumber: string;

    @Prop()
    description: string;

    @Prop()
    province: string;

    @Prop()
    city: string;

    @Prop()
    district: string;

}

export const UserSchema = SchemaFactory.createForClass(User);

