import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TracksController } from './track.controller.js';
import { TracksService } from './track.service.js';
import { Track, TrackSchema } from './track.schema.js';
import {User, UserSchema} from "../users/user.schema.js";
import {TokenAuthGuard} from "../auth/token-auth.guard.js";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Track.name, schema: TrackSchema },
            { name: User.name, schema: UserSchema },
        ]),
    ],
    controllers: [TracksController],
    providers: [TracksService, TokenAuthGuard],
})
export class TracksModule {}