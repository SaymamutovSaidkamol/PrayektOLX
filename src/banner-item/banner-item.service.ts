import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBannerItemDto } from './dto/create-banner-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BannerItem } from './entities/banner-item.entity';
import mongoose, { Model } from 'mongoose';
import { Banner } from 'src/banners/entities/banner.entity';
import { Region } from 'src/region/entities/region.entity';

@Injectable()
export class BannerItemService {
  constructor(
    @InjectModel(BannerItem.name) private BannerItemModel: Model<BannerItem>,
    @InjectModel(Banner.name) private BannerModel: Model<Banner>,
    @InjectModel(Region.name) private RegionModel: Model<Region>,
  ) {}

  async create(data: CreateBannerItemDto): Promise<BannerItem> {
    const bannerItem = new this.BannerItemModel({
      banner: new mongoose.Types.ObjectId(data.banner),
      region: data.region.map((id) => new mongoose.Types.ObjectId(id)),
    });

    const savedBannerItem = await bannerItem.save();

    await this.BannerModel.findByIdAndUpdate(
      data.banner,
      { $push: { bannerItem: savedBannerItem._id } },
      { new: true },
    );

    return savedBannerItem;
  }

  async remove(bannerItemId: string) {
    const bannerItem = await this.BannerItemModel.findById(bannerItemId);
    if (!bannerItem) {
      throw new Error('Banner item not found');
    }

    const deleteBannerItem =
      await this.BannerItemModel.findByIdAndDelete(bannerItemId);

    return { message: 'Region deleted successfully', data: deleteBannerItem };
  }
}
