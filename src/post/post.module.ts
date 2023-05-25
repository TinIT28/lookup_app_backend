/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsSchema } from './schema/post.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Posts', schema: PostsSchema }])],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule { }
