import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artist, ArtistDocument } from './artist.schema.js';
import { CreateArtistDto } from './artist.dto.js';

@Injectable()
export class ArtistsService {
    constructor(
        @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
    ) {}

    async getAll(): Promise<Artist[]> {
        return this.artistModel.find().exec();
    }

    async getOne(id: string): Promise<Artist> {
        const artist = await this.artistModel.findById(id).exec();
        if (!artist) {
            throw new NotFoundException('Artist not found');
        }
        return artist;
    }

    async create(createArtistDto: CreateArtistDto, photoPath?: string): Promise<Artist> {
        const newArtist = new this.artistModel({
            ...createArtistDto,
            photo: photoPath || null,
        });
        return newArtist.save();
    }

    async delete(id: string): Promise<{ message: string }> {
        const result = await this.artistModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException('Artist not found');
        }
        return { message: 'Artist deleted successfully' };
    }
}