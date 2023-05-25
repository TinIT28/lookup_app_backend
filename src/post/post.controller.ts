/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post-dto';
import { Posts } from './schema/post.schema';
import { ObjectId } from 'mongoose';
import { UpdatePostDto } from './dto/update-post-dto';
import { JwtGuard } from 'src/auth/utils/JwtGuard';

@Controller('post')
export class PostController {
    constructor(private postService: PostService) { }

    @Post()
    async createPost(@Body() post: CreatePostDto): Promise<Posts> {
        return this.postService.create(post);
    }

    @UseGuards(JwtGuard)
    @Get()
    async getAllPosts(): Promise<Posts[]> {
        return this.postService.getAll();
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    async getPostById(@Param() id: ObjectId): Promise<Posts> {
        return this.postService.getById(id);
    }

    @UseGuards(JwtGuard)
    @Put()
    async updatePostById(@Param() id: ObjectId, @Body() post: UpdatePostDto): Promise<Posts> {
        return this.postService.update(id, post);
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    async deletePostById(@Param() id: ObjectId): Promise<Posts> {
        return this.postService.delete(id);
    }
}
