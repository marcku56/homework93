import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ArtistsController } from './artist.controller.js';
import { ArtistsService } from './artists.service.js';
import { Artist, ArtistSchema } from './artist.schema.js';

import { User, UserSchema } from '../users/user.schema.js';
import { TokenAuthGuard } from '../auth/token-auth.guard.js';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Artist.name, schema: ArtistSchema },
            { name: User.name, schema: UserSchema },
        ]),
    ],
    controllers: [ArtistsController],
    providers: [ArtistsService, TokenAuthGuard],
    exports: [MongooseModule],
})
export class ArtistsModule {}