  import { Module } from '@nestjs/common';
  import { BannerItemService } from './banner-item.service';
  import { BannerItemController } from './banner-item.controller';
  import { MongooseModule } from '@nestjs/mongoose';
  import { BannerItem, BannerItemSchema } from './entities/banner-item.entity';
  import { Banner, BannerSchema } from 'src/banners/entities/banner.entity';
  import { Region, RegionSchema } from 'src/region/entities/region.entity';

  @Module({
    imports: [
      MongooseModule.forFeature([
        { name: BannerItem.name, schema: BannerItemSchema },
        { name: Banner.name, schema: BannerSchema },
        { name: Region.name, schema: RegionSchema },
      ]),
    ],
    controllers: [BannerItemController],
    providers: [BannerItemService],
  })
  export class BannerItemModule {}
