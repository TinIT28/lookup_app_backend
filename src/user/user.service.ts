/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: mongoose.Model<User>) { }

    async create(user: CreateUserDto) {
        user.hashPassword = await bcrypt.hash(user.password, 8);
        const newUser = await this.userModel.create(user);
        await newUser.save();

        delete newUser.password;
        return newUser;
    }
}
