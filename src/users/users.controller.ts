import {
    Controller,
    Post,
    Delete,
    Body,
    UseGuards,
    Req,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import { RegisterUserDto } from './dto/register-user.dto.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import { TokenAuthGuard } from '../auth/token-auth.guard.js';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    register(@Body() registerUserDto: RegisterUserDto) {
        return this.usersService.register(registerUserDto);
    }

    @Post('sessions')
    login(@Body() loginUserDto: LoginUserDto) {
        return this.usersService.login(loginUserDto);
    }

    @Delete('sessions')
    @UseGuards(TokenAuthGuard)
    logout(@Req() req: any) {
        return this.usersService.logout(req.user);
    }
}