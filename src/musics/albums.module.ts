import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumsService } from './albums.service.js';
import { Album, AlbumSchema } from './album.schema.js';
import {User, UserSchema} from "../users/user.schema.js";
import {TokenAuthGuard} from "../auth/token-auth.guard.js";
import {AlbumsController} from "./albums.controller.js";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Album.name, schema: AlbumSchema },
            { name: User.name, schema: UserSchema },
        ]),
    ],
    controllers: [AlbumsController],
    providers: [AlbumsService, TokenAuthGuard],
})
export class AlbumsModule {}