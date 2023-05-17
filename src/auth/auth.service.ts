/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { LoginUserDto } from 'src/user/dto/login-user-dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

    async register(user: CreateUserDto): Promise<{ token: string }> {
        return this.userService.create(user);
    }

    async login(user: LoginUserDto): Promise<{ token: string }> {
        return this.userService.login(user);
    }
}
