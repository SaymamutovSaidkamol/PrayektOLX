import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Banner } from './entities/banner.entity';
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
import { Like } from 'src/like/entities/like.entity';
import { BannerItem } from 'src/banner-item/entities/banner-item.entity';

@Injectable()
export class BannersService {
  constructor(
    @InjectModel(Banner.name) private BannerModel: Model<Banner>,
    @InjectModel(Category.name) private CategoryModel: Model<Category>,
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(Like.name) private LikeModel: Model<Like>,
    @InjectModel(BannerItem.name) private BannerItemModel: Model<BannerItem>,
  ) {}

  async findAll() {
    const allBanner = await this.BannerModel.find()
      .populate('category')
      .populate('user')
      .populate('comments')
      .populate({
        path: 'bannerItem',
        populate: { path: 'region' },
      });

    for (const banner of allBanner) {
      const likeCount = await this.LikeModel.countDocuments({
        banner: banner._id,
      });
      banner.likeCount = likeCount;
    }

    return { data: allBanner };
  }

  async create(data: CreateBannerDto, req: Request) {

    if (req['user'].type === 'RECIPIENT') {
      throw new BadRequestException(
        'You Can Not Create a Banner',
      );
    }

    const checkCateg = await this.CategoryModel.findOne({ _id: data.category });

    if (!checkCateg) {
      throw new NotFoundException('Category Not Found');
    }

    const newBanner = await this.BannerModel.create(data);

    await newBanner.populate(['category', 'user']);

    return {
      message: 'Banner Created Successfully',
      data: newBanner,
    };
  }

  async findOne(id: string) {
    const checkBanner = await this.BannerModel.findById(id);

    if (!checkBanner) {
      throw new NotFoundException('Banner Not Found');
    }

    return { data: checkBanner };
  }

  async remove(id: string, req: Request) {
    if (req['user'].type === 'RECIPIENT') {
      throw new BadRequestException(
        'Your Banner is unavailable.',
      );
    }
    const checkBanner = await this.BannerModel.findById(id);

    if (!checkBanner) {
      throw new NotFoundException('Banner Not Found');
    }

    const deleteBanner = await this.BannerModel.findByIdAndDelete(id);

    return { message: 'Banner Deleted Successfully', data: deleteBanner };
  }

  async query(data: any) {
    let { name, price, category, page, limit, sortBy, order, ...filters } =
      data;

    const query: any = { ...filters };

    if (name) {
      query.name = name;
    }

    if (category) {
      query.category = category;
    }

    if (price) {
      query.price = price;
    }

    const skip = (page - 1) * limit;

    return this.BannerModel.find(query)
      .sort({
        [sortBy]: order === 'asc' ? 1 : -1,
      })
      .skip(skip)
      .limit(parseInt(limit, 10))
      .populate('category')
      .populate('user')
      .populate('comments')
      .populate({
        path: 'bannerItem',
        populate: { path: 'region' },
      });
  }
}
