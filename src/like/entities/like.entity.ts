import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Banner } from 'src/banners/entities/banner.entity';

@Schema({ timestamps: true })
export class Like {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Banner' })
  banner: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  user: string;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
