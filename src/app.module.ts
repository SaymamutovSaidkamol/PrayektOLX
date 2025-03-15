import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BannersModule } from './banners/banners.module';
import { CategoryModule } from './category/category.module';
import { RegionModule } from './region/region.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadModule } from './uploads/upload.module';
import { LikeModule } from './like/like.module';
import { CommentModule } from './comment/comment.module';
import { BannerItemModule } from './banner-item/banner-item.module';

@Module({
  imports: [UsersModule, BannersModule, CategoryModule, RegionModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/OLX'), UploadModule, LikeModule, CommentModule, BannerItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
