/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException, Session } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import mongoose, { ObjectId } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user-dto';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user-dto';
import { UserDetails } from 'src/utils/types';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>,
        private jwtService: JwtService
    ) { }

    async create(user: CreateUserDto): Promise<User | undefined> {
        user.hashPassword = await bcrypt.hash(user.password, 8);
        const newUser = await this.userModel.create(user);
        await newUser.save();

        delete newUser.password;

        return newUser;
    }

    async validateUser(email: string, password: string): Promise<User | undefined> {

        const user = await this.userModel.findOne({ email }).exec();
        const doesUserExist = !!user;

        if (!doesUserExist) return null;

        const doesPasswordMatch = await bcrypt.compare(password, user.hashPassword);

        if (!doesPasswordMatch) return null;

        return user;


    }

    async login(loginDto: LoginUserDto): Promise<{ token: string } | undefined> {
        const { email, password } = loginDto;

        const user = await this.validateUser(email, password);

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const isPasswordMatched = await bcrypt.compare(password, user.hashPassword);

        if (!isPasswordMatched) {
            throw new UnauthorizedException('Invalid password')
        }

        const jwt = await this.jwtService.signAsync({ user });

        return { token: jwt }
    }

    async googleLogin(email: string): Promise<{ token: string } | undefined> {
        const jwt = await this.jwtService.signAsync({ email });
        return { token: jwt }
    }

    async findUserGoogle(email: any): Promise<User> {
        const user = await this.userModel.findOne(email);
        return user;
    }

    async findUserLocal(email: string): Promise<User | undefined> {
        const user = await this.userModel.findOne({ email })
        return user;
    }

    async createUserGoogle(details: UserDetails) {
        const newUser = await this.userModel.create(details);
        return newUser.save();
    }

    async findUserService(id: ObjectId) {
        const user = await this.userModel.findById(id);
        return user;
    }

    async findUserById(userId: string) {
        const user = await this.userModel.findById(userId)
        return user;
    }
}
