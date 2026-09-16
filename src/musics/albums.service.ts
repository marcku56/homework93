import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Album, AlbumDocument } from './album.schema.js';
import { CreateAlbumDto } from './album.dto.js';

@Injectable()
export class AlbumsService {
    constructor(
        @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    ) {}

    async getAll(artistId?: string): Promise<Album[]> {
        const filter = artistId ? { artist: artistId } : {};
        return this.albumModel.find(filter).populate('artist').exec();
    }

    async getOne(id: string): Promise<Album> {
        const album = await this.albumModel.findById(id).populate('artist').exec();
        if (!album) {
            throw new NotFoundException('Album not found');
        }
        return album;
    }

    async create(createAlbumDto: CreateAlbumDto, coverPath?: string): Promise<Album> {
        const newAlbum = new this.albumModel({
            ...createAlbumDto,
            releaseYear: Number(createAlbumDto.releaseYear),
            cover: coverPath || null,
        });
        return newAlbum.save();
    }

    async delete(id: string): Promise<{ message: string }> {
        const result = await this.albumModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException('Album not found');
        }
        return { message: 'Album deleted successfully' };
    }
}