import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Like } from './entities/like.entity';
import { Banner } from 'src/banners/entities/banner.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectModel(Like.name) private LikeModel: Model<Like>,
    @InjectModel(Banner.name) private BannerModel: Model<Banner>,
  ) {}

  async create(data: CreateLikeDto) {
    const checkBanner = await this.BannerModel.findOne({ _id: data.banner });

    if (!checkBanner) {
      throw new NotFoundException('Banner Not Found');
    }

    const existingLike = await this.LikeModel.findOne({
      user: data.user,
      banner: data.banner,
    });

    if (existingLike) {
      await this.LikeModel.findByIdAndDelete(existingLike._id);
      return { message: 'Like removed' };
    } else {
      await this.LikeModel.create({ user: data.user, banner: data.banner });
      return { message: 'Like added' };
    }
  }

  findAll() {
    return `This action returns all like`;
  }

  remove(id: string) {
    return `This action removes a #${id} like`;
  }
}
