import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Body,
    UseInterceptors,
    UploadedFile,
    UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { ArtistsService } from './artists.service.js';
import { CreateArtistDto } from './artist.dto.js';

import { TokenAuthGuard } from '../auth/token-auth.guard.js';
import { RolesGuard } from '../auth/roles.guard.js';
import { Roles } from '../auth/roles.decorator.js';

@Controller('artists')
export class ArtistsController {
    constructor(private readonly artistsService: ArtistsService) {}

    @Get()
    getAll() {
        return this.artistsService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.artistsService.getOne(id);
    }

    @Post()
    @UseGuards(TokenAuthGuard)
    @UseInterceptors(
        FileInterceptor('photo', {
            storage: diskStorage({
                destination: './public/uploads/artists',
                filename: (req, file, callback) => {
                    const ext = extname(file.originalname);

                    callback(null, `${Date.now()}${ext}`);
                },
            }),
        }),
    )
    create(
        @Body() createArtistDto: CreateArtistDto,
        @UploadedFile() file?: Express.Multer.File,
    ) {
        const photoPath = file
            ? `public/uploads/artists/${file.filename}`
            : undefined;

        return this.artistsService.create(createArtistDto, photoPath);
    }

    @Delete(':id')
    @UseGuards(TokenAuthGuard, RolesGuard)
    @Roles('admin')
    delete(@Param('id') id: string) {
        return this.artistsService.delete(id);
    }
}