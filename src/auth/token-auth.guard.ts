import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/user.schema.js';

@Injectable()
export class TokenAuthGuard implements CanActivate {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const headerValue = request.get('Authorization');

        if (!headerValue) {
            throw new UnauthorizedException('No token provided');
        }

        const token = headerValue;

        const user = await this.userModel.findOne({ token });

        if (!user) {
            throw new UnauthorizedException('Wrong token');
        }

        request.user = user;
        return true;
    }
}