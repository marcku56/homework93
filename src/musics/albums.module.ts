import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumsController } from './albums.controller.js';
import { AlbumsService } from './albums.service.js';
import { Album, AlbumSchema } from './album.schema.js';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
    ],
    controllers: [AlbumsController],
    providers: [AlbumsService],
    exports: [MongooseModule],
})
export class AlbumsModule {}