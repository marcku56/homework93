import {
    Injectable,
    BadRequestException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { User, UserDocument } from './user.schema.js';
import { RegisterUserDto } from './dto/register-user.dto.js';
import { LoginUserDto } from './dto/login-user.dto.js';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async register(registerUserDto: RegisterUserDto) {
        const existingUser = await this.userModel.findOne({
            username: registerUserDto.username,
        });

        if (existingUser) {
            throw new BadRequestException('User with this username already exists');
        }

        const user = new this.userModel({
            username: registerUserDto.username,
            password: registerUserDto.password,
            role: registerUserDto.role || 'user',
            token: randomUUID(),
        });

        await user.save();

        return {
            _id: user._id,
            username: user.username,
            role: user.role,
            token: user.token,
        };
    }

    async login(loginUserDto: LoginUserDto) {
        const user = await this.userModel.findOne({
            username: loginUserDto.username,
        });

        if (!user) {
            throw new UnauthorizedException('Username or password incorrect');
        }

        const isMatch = await bcrypt.compare(loginUserDto.password, user.password);

        if (!isMatch) {
            throw new UnauthorizedException('Username or password incorrect');
        }

        user.token = randomUUID();
        await user.save();

        return {
            _id: user._id,
            username: user.username,
            role: user.role,
            token: user.token,
        };
    }

    async logout(user: UserDocument) {
        user.token = randomUUID();
        await user.save();
        return { message: 'Logged out successfully' };
    }
}