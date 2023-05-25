/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';
import { Posts } from './schema/post.schema';
import { CreatePostDto } from './dto/create-post-dto';
import { UpdatePostDto } from './dto/update-post-dto';

@Injectable()
export class PostService {
    constructor(@InjectModel(Posts.name) private postModel: mongoose.Model<Posts>) { }

    async create(post: CreatePostDto): Promise<Posts> {
        const newPost = await this.postModel.create(post);
        return newPost;
    }

    async getAll(): Promise<Posts[]> {
        const posts = await this.postModel.find();
        return posts;
    }

    async getById(id: ObjectId): Promise<Posts> {
        const post = await this.postModel.findById(id)
        return post;
    }

    async update(id: ObjectId, post: UpdatePostDto): Promise<Posts> {
        const postUpdate = await this.postModel.findByIdAndUpdate(id, post);
        return postUpdate;
    }

    async delete(id: ObjectId): Promise<Posts> {
        const postDelete = await this.postModel.findById(id);
        if (!postDelete) {
            throw new NotFoundException()
        }
        return await postDelete.deleteOne();
    }
}
