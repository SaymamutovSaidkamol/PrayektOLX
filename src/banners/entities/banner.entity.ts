import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BannerItem } from 'src/banner-item/entities/banner-item.entity';
import { Category } from 'src/category/entities/category.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Region } from 'src/region/entities/region.entity';
import { User } from 'src/users/entities/user.entity';

@Schema({ timestamps: true })
export class Banner {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  image: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  })
  category: Category;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BannerItem' }] })
  bannerItem: mongoose.Types.ObjectId[];

  @Prop({ default: 0 })
  likeCount: number;
}

export const BannerSchema = SchemaFactory.createForClass(Banner);
