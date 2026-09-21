import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Query,
    Body,
    UseInterceptors,
    UploadedFile,
    UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AlbumsService } from './albums.service.js';
import { CreateAlbumDto } from './album.dto.js';
import { TokenAuthGuard } from '../auth/token-auth.guard.js';
import { RolesGuard } from '../auth/roles.guard.js';
import { Roles } from '../auth/roles.decorator.js';

@Controller('albums')
export class AlbumsController {
    constructor(private readonly albumsService: AlbumsService) {}

    @Get()
    getAll(@Query('artist') artistId?: string) {
        return this.albumsService.getAll(artistId);
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.albumsService.getOne(id);
    }

    @Post()
    @UseGuards(TokenAuthGuard)
    @UseInterceptors(
        FileInterceptor('cover', {
            storage: diskStorage({
                destination: './public/uploads/albums',
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
                    callback(null, `${uniqueSuffix}${ext}`);
                },
            }),
        }),
    )
    create(
        @Body() createAlbumDto: CreateAlbumDto,
        @UploadedFile() file?: Express.Multer.File,
    ) {
        const coverPath = file ? `public/uploads/albums/${file.filename}` : undefined;
        return this.albumsService.create(createAlbumDto, coverPath);
    }

    @Delete(':id')
    @UseGuards(TokenAuthGuard, RolesGuard)
    @Roles('admin')
    delete(@Param('id') id: string) {
        return this.albumsService.delete(id);
    }
}