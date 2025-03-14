import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Region } from 'src/region/entities/region.entity';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true, default: 'RECIPIENT' })
  type: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Region' })
  region: Region;

  @Prop({ required: true })
  shopName: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
