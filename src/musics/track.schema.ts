import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Album } from './album.schema.js';

export type TrackDocument = Track & Document;

@Schema({ versionKey: false })
export class Track {
    @Prop({ required: true })
    title: string;

    @Prop({ type: Types.ObjectId, ref: Album.name, required: true })
    album: Types.ObjectId;

    @Prop({ required: true })
    duration: string;

    @Prop({ required: true })
    number: number;
}

export const TrackSchema = SchemaFactory.createForClass(Track);