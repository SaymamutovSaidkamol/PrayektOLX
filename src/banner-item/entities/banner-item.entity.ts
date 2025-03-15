import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Banner } from 'src/banners/entities/banner.entity';

@Schema({ timestamps: true })
export class BannerItem extends Document {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Banner' })
  banner: mongoose.Types.ObjectId;

  @Prop({ required: true, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Region' }] })
  region: mongoose.Types.ObjectId[];
}

export const BannerItemSchema = SchemaFactory.createForClass(BannerItem);
