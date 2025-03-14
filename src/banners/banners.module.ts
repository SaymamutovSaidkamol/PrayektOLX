import { Module } from '@nestjs/common';
import { BannersService } from './banners.service';
import { BannersController } from './banners.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Banner, BannerSchema } from './entities/banner.entity';
import {
  Category,
  CategorySchema,
} from 'src/category/entities/category.entity';
import { Region, RegionSchema } from 'src/region/entities/region.entity';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { Like, LikeSchema } from 'src/like/entities/like.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Banner.name, schema: BannerSchema },
      { name: Category.name, schema: CategorySchema }, 
      { name: Region.name, schema: RegionSchema },
      { name: User.name, schema: UserSchema },
      { name: Like.name, schema: LikeSchema },
    ]),
  ],
  controllers: [BannersController],
  providers: [BannersService],
})
export class BannersModule {}
