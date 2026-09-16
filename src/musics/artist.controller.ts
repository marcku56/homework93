import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Body,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ArtistsService } from './artists.service.js';
import { CreateArtistDto } from './artist.dto.js';

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
    @UseInterceptors(
        FileInterceptor('photo', {
            storage: diskStorage({
                destination: './public/uploads/artists',
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
                    callback(null, `${uniqueSuffix}${ext}`);
                },
            }),
        }),
    )
    create(
        @Body() createArtistDto: CreateArtistDto,
        @UploadedFile() file?: Express.Multer.File,
    ) {
        const photoPath = file ? `public/uploads/artists/${file.filename}` : undefined;
        return this.artistsService.create(createArtistDto, photoPath);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.artistsService.delete(id);
    }
}