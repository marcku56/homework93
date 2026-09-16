import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Artist } from './artist.schema.js';

export type AlbumDocument = Album & Document;

@Schema({ versionKey: false })
export class Album {
    @Prop({ required: true })
    title: string;

    @Prop({ type: Types.ObjectId, ref: Artist.name, required: true })
    artist: Types.ObjectId;

    @Prop({ required: true })
    releaseYear: number;

    @Prop({ default: null })
    cover: string;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);