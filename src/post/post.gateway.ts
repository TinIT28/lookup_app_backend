/* eslint-disable prettier/prettier */
import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(8001, { cors: '*:*' })
export class PostGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('post')
    handlePostCreated(post: any) {
        this.server.emit('postCreated', post);
    }

    @SubscribeMessage('post')
    handlePostLiked(post: any) {
        this.server.emit('likedPost', post)
    }

    @SubscribeMessage('post')
    handlePostDisliked(post: any) {
        this.server.emit('dislikedPost', post)
    }

    @SubscribeMessage('post')
    handleGetPost(post: any) {
        this.server.emit('getPost', post);
    }
}