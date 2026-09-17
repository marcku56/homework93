import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TracksController } from './track.controller.js';
import { TracksService } from './track.service.js';
import { Track, TrackSchema } from './track.schema.js';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    ],
    controllers: [TracksController],
    providers: [TracksService],
})
export class TracksModule {}