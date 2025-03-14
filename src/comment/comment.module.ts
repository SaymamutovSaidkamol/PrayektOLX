import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './entities/comment.entity';
import { Banner, BannerSchema } from 'src/banners/entities/banner.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema },
      { name: Banner.name, schema: BannerSchema },
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
