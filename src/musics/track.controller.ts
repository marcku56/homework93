import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Query,
    Body,
    UseGuards,
} from '@nestjs/common';
import { TracksService } from './track.service.js';
import { CreateTrackDto } from './track.dto.js';
import { TokenAuthGuard } from '../auth/token-auth.guard.js';
import { RolesGuard } from '../auth/roles.guard.js';
import { Roles } from '../auth/roles.decorator.js';

@Controller('tracks')
export class TracksController {
    constructor(private readonly tracksService: TracksService) {}

    @Get()
    getAll(@Query('album') albumId?: string) {
        return this.tracksService.getAll(albumId);
    }

    @Post()
    @UseGuards(TokenAuthGuard)
    create(@Body() createTrackDto: CreateTrackDto) {
        return this.tracksService.create(createTrackDto);
    }

    @Delete(':id')
    @UseGuards(TokenAuthGuard, RolesGuard)
    @Roles('admin')
    delete(@Param('id') id: string) {
        return this.tracksService.delete(id);
    }
}