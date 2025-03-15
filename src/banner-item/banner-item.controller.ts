import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BannerItemService } from './banner-item.service';
import { CreateBannerItemDto } from './dto/create-banner-item.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('banner-item')
export class BannerItemController {
  constructor(private readonly bannerItemService: BannerItemService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createBannerItemDto: CreateBannerItemDto) {
    return this.bannerItemService.create(createBannerItemDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bannerItemService.remove(id);
  }
}
