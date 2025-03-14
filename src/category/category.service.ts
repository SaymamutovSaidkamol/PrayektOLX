import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';
import * as path from 'path';
import * as fs from 'fs';

const deleteOldImage = (imgPath) => {
  if (imgPath) {
    const fullPath = path.join('uploads', imgPath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  }
};

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private CategoryModel: Model<Category>,
  ) {}

  async create(data: CreateCategoryDto) {
    console.log('Received data:', data);

    const checkCateg = await this.CategoryModel.findOne({ name: data.name });

    if (checkCateg) {
      throw new BadRequestException('This Category Already Exists');
    }

    const newCateg = await this.CategoryModel.create(data);

    return { message: 'Category Created Successfully', data: newCateg };
  }

  async findAll() {
    const allCategory = await this.CategoryModel.find();

    return { data: allCategory };
  }

  async findOne(id: string) {
    const OneCategory = await this.CategoryModel.findById(id);

    if (!OneCategory) {
      throw new NotFoundException('Category Not Found');
    }

    return { data: OneCategory };
  }

  async update(id: string, data: UpdateCategoryDto) {
    const chekCategory = await this.CategoryModel.findById(id);

    if (!chekCategory) {
      throw new NotFoundException('Category Not Found');
    }

    let check = await this.CategoryModel.findOne({ name: data.name });

    if (check) {
      throw new BadRequestException('This Category Alredy Exist');
    }

    if (data.img && chekCategory.img) {
      deleteOldImage(chekCategory.img);
    }

    let updateCategory = await this.CategoryModel.findByIdAndUpdate(id, data, {
      newL: true,
    });

    return { message: 'Category Updated Successfully', data: updateCategory };
  }

  async remove(id: string) {
    const chekCategory = await this.CategoryModel.findById(id);

    if (!chekCategory) {
      throw new NotFoundException('Category Not Found');
    }

    deleteOldImage(chekCategory.img);

    let deletCategory = await this.CategoryModel.findByIdAndDelete(id);

    return { message: 'Category Deleted Successfully', data: deletCategory };
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

    return this.CategoryModel.find(query)
      .sort({
        [sortBy]: order === 'asc' ? 1 : -1, // ✅ Shu yerda to‘g‘rilandi
      })
      .skip(skip)
      .limit(parseInt(limit, 10));
  }

}
