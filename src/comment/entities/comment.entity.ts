import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Banner } from 'src/banners/entities/banner.entity';
import { User } from 'src/users/entities/user.entity';

@Schema({ timestamps: true })
export class Comment {
  @Prop({ required: true })
  name: string;

  @Prop()
  star: number;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Banner',
  })
  banner: mongoose.Schema.Types.ObjectId;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: User;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
