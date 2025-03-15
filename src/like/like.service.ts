import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Like } from './entities/like.entity';
import { Banner } from 'src/banners/entities/banner.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectModel(Like.name) private LikeModel: Model<Like>,
    @InjectModel(Banner.name) private BannerModel: Model<Banner>,
    @InjectModel(User.name) private UserModel: Model<User>,
  ) {}

  async create(data: CreateLikeDto, req: Request) {
    const CheckUser = await this.UserModel.findById(req['user']._id);

    if (!CheckUser) {
      throw new NotFoundException('User Not Found');
    }

    data.user = req['user']._id

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
}
