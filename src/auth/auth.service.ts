/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { LoginUserDto } from 'src/user/dto/login-user-dto';
import { UserService } from 'src/user/user.service';
import { UserDetails } from 'src/utils/types';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

    async register(user: CreateUserDto): Promise<User | undefined> {
        return this.userService.create(user);
    }

    async validateUser(details: UserDetails) {
        console.log('AuthService');
        console.log(details);
        const user = await this.userService.findUserGoogle({ email: details.email });
        console.log(user);
        if (user) {
            console.log("Check user is valid: ", user);
            return user;
        }
        console.log('User not found. Creating...');
        return this.userService.createUserGoogle(details);

    }

    async loginUser(loginUserDto: LoginUserDto): Promise<{ token: string }> {

        return this.userService.login(loginUserDto)
    }

    async findUser(id: ObjectId) {
        return this.userService.findUserService(id);
    }
}
