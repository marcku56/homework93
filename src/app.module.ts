import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ArtistsModule } from './musics/artists.module.js';
import { AlbumsModule } from './musics/albums.module.js';
import { TracksModule } from './musics/track.module.js';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/music-api'),
    ServeStaticModule.forRoot({
      rootPath: join(import.meta.dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    ArtistsModule,
    AlbumsModule,
    TracksModule,
  ],
})
export class AppModule {}