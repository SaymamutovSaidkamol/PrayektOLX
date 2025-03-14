import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Region } from './entities/region.entity';
import { Model } from 'mongoose';

@Injectable()
export class RegionService {
  constructor(@InjectModel(Region.name) private RegionModel: Model<Region>) {}

  async create(data: CreateRegionDto) {
    let check = await this.RegionModel.findOne({ name: data.name });

    if (check) {
      throw new BadRequestException('This Region alredy exist');
    }

    let newRegion = await this.RegionModel.create(data);
    return { message: 'Region Creted Successfully', data: newRegion };
  }

  async findAll() {
    const allRegion = await this.RegionModel.find();

    return { data: allRegion };
  }

  async findOne(id: string) {
    const OneRegion = await this.RegionModel.findById(id);

    if (!OneRegion) {
      throw new NotFoundException('Region Not Found');
    }

    return { data: OneRegion };
  }

  async update(id: string, data: UpdateRegionDto) {
    const chekRegion = await this.RegionModel.findById(id);

    if (!chekRegion) {
      throw new NotFoundException('Region Not Found');
    }

    let check = await this.RegionModel.findOne({ name: data.name });

    if (check) {
      throw new BadRequestException('This Region Alredy Exist');
    }

    let updateRegion = await this.RegionModel.findByIdAndUpdate(id, data, {
      newL: true,
    });

    return { message: 'Region Updated Successfully', data: updateRegion };
  }

  async remove(id: string) {
    const chekRegion = await this.RegionModel.findById(id);

    if (!chekRegion) {
      throw new NotFoundException('Region Not Found');
    }

    let deletRegion = await this.RegionModel.findByIdAndDelete(id);

    return { message: 'Region Deleted Successfully', data: deletRegion };
  }

  async query(data: any) {
    let { name, page, limit, sortBy, order, ...filters } = data;

    page = page || 1;
    limit = limit || 10;
    sortBy = sortBy || 'name';
    order = order || 'asc';

    const query: any = { ...filters };

    if (name) {
      query.name = name;
    }

    const skip = (page - 1) * limit;

    return this.RegionModel.find(query)
      .sort({
        [sortBy]: order === 'asc' ? 1 : -1, // ✅ Shu yerda to‘g‘rilandi
      })
      .skip(skip)
      .limit(parseInt(limit, 10));
  }
}
