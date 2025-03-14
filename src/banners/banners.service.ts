import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Banner } from './entities/banner.entity';
import { Category } from 'src/category/entities/category.entity';
import { Region } from 'src/region/entities/region.entity';
import { User } from 'src/users/entities/user.entity';
import { LikeModule } from 'src/like/like.module';
import { Like } from 'src/like/entities/like.entity';

@Injectable()
export class BannersService {
  constructor(
    @InjectModel(Banner.name) private BannerModel: Model<Banner>,
    @InjectModel(Category.name) private CategoryModel: Model<Category>,
    @InjectModel(Region.name) private RegionModel: Model<Region>,
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(Like.name) private LikeModel: Model<Like>,
  ) {}

  async create(data: CreateBannerDto) {
    const checkCateg = await this.CategoryModel.findOne({ _id: data.category });

    if (!checkCateg) {
      throw new NotFoundException('Category Not Found');
    }

    const checkRegion = await this.RegionModel.findOne({ _id: data.region });

    if (!checkRegion) {
      throw new NotFoundException('Region Not Found');
    }

    const newBanner = await this.BannerModel.create(data);

    await newBanner.populate(['category', 'region', 'user']);

    return {
      message: 'Banner Created Successfully',
      data: newBanner,
    };
  }

  async findAll() {
    const allBanner = await this.BannerModel.find()
      .populate('category')
      .populate('region')
      .populate('user')
      .populate('comments');

    for (const banner of allBanner) {
      const likeCount = await this.LikeModel.countDocuments({
        banner: banner._id,
      });
      banner.likeCount = likeCount;
    }

    return { data: allBanner };
  }

  async findOne(id: string) {
    const checkBanner = await this.BannerModel.findById(id);

    if (!checkBanner) {
      throw new NotFoundException('Banner Not Found');
    }

    return { data: checkBanner };
  }

  async remove(id: string) {
    const checkBanner = await this.BannerModel.findById(id);

    if (!checkBanner) {
      throw new NotFoundException('Banner Not Found');
    }

    const deleteBanner = await this.BannerModel.findByIdAndDelete(id);

    return { message: 'Banner Deleted Successfully', data: deleteBanner };
  }
}
