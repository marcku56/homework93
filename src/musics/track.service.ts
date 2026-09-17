import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Track, TrackDocument } from './track.schema.js';
import { CreateTrackDto } from './track.dto.js';

@Injectable()
export class TracksService {
    constructor(
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    ) {}

    async getAll(albumId?: string): Promise<Track[]> {
        const filter = albumId ? { album: albumId } : {};
        return this.trackModel
            .find(filter)
            .populate({
                path: 'album',
                populate: { path: 'artist' },
            })
            .sort({ number: 1 })
            .exec();
    }

    async create(createTrackDto: CreateTrackDto): Promise<Track> {
        const newTrack = new this.trackModel({
            ...createTrackDto,
            number: Number(createTrackDto.number),
        });
        return newTrack.save();
    }

    async delete(id: string): Promise<{ message: string }> {
        const result = await this.trackModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException('Track not found');
        }
        return { message: 'Track deleted successfully' };
    }
}