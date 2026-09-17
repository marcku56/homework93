import { Controller, Get, Post, Delete, Param, Query, Body } from '@nestjs/common';
import { TracksService } from './track.service.js';
import { CreateTrackDto } from './track.dto.js';

@Controller('tracks')
export class TracksController {
    constructor(private readonly tracksService: TracksService) {}

    @Get()
    getAll(@Query('album') albumId?: string) {
        return this.tracksService.getAll(albumId);
    }

    @Post()
    create(@Body() createTrackDto: CreateTrackDto) {
        return this.tracksService.create(createTrackDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.tracksService.delete(id);
    }
}