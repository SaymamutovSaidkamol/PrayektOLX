import { Module } from '@nestjs/common';
import { BannersService } from './banners.service';
import { BannersController } from './banners.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Banner, BannerSchema } from './entities/banner.entity';
import {
  Category,
  CategorySchema,
} from 'src/category/entities/category.entity';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { Like, LikeSchema } from 'src/like/entities/like.entity';
import { BannerItem, BannerItemSchema } from 'src/banner-item/entities/banner-item.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Banner.name, schema: BannerSchema },
      { name: Category.name, schema: CategorySchema }, 
      { name: User.name, schema: UserSchema },
      { name: Like.name, schema: LikeSchema },
      { name: BannerItem.name, schema: BannerItemSchema },
    ]),
  ],
  controllers: [BannersController],
  providers: [BannersService],
})
export class BannersModule {}
