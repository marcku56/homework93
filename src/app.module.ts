import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ArtistsModule } from './musics/artists.module.js';
import { AlbumsModule } from './musics/albums.module.js';
import { TracksModule } from './musics/track.module.js';
import { UsersModule } from './users/users.module.js';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/music-api'),
    ServeStaticModule.forRoot({
      rootPath: join(import.meta.dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    UsersModule,
    ArtistsModule,
    AlbumsModule,
    TracksModule,
  ],
})
export class AppModule {}