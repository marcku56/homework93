import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

export type UserDocument = User & Document;

const SALT_WORK_FACTOR = 10;

@Schema({ versionKey: false })
export class User {
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({
        required: true,
        enum: ['user', 'admin'],
        default: 'user',
    })
    role: string;

    @Prop({ required: true })
    token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', async function () {
    if (!this.isModified('password')) {
        return;
    }

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);

    if (!this.token) {
        this.token = randomUUID();
    }
});

UserSchema.methods.generateToken = function () {
    this.token = randomUUID();
};