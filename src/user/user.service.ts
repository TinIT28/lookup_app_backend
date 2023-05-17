/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user-dto';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user-dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>,
        private jwtService: JwtService
    ) { }

    async create(user: CreateUserDto): Promise<{ token: string }> {
        user.hashPassword = await bcrypt.hash(user.password, 8);
        const newUser = await this.userModel.create(user);

        const token = this.jwtService.sign({ id: newUser._id })
        await newUser.save();

        delete newUser.password;

        return { token };
    }

    async login(loginDto: LoginUserDto): Promise<{ token: string }> {
        const { email, password } = loginDto;

        const user = await this.userModel.findOne({ email });

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const isPasswordMatched = await bcrypt.compare(password, user.hashPassword);

        if (!isPasswordMatched) {
            throw new UnauthorizedException('Invalid password')
        }

        const token = this.jwtService.sign({ id: user._id })

        return { token }
    }
}
