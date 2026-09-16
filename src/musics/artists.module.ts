import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtistsController } from './artist.controller.js';
import { ArtistsService } from './artists.service.js';
import { Artist, ArtistSchema } from './artist.schema.js';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }]),
    ],
    controllers: [ArtistsController],
    providers: [ArtistsService],
    exports: [MongooseModule],
})
export class ArtistsModule {}