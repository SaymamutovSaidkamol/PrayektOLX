import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { Region } from 'src/region/entities/region.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
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
export class UsersService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private jwtService: JwtService,
    @InjectModel(Region.name) private RegionModel: Model<Region>,
  ) {}

  async register(data: CreateUserDto) {
    const CheckUser = await this.UserModel.findOne({ phone: data.phone });

    if (CheckUser) {
      throw new BadRequestException('This User Alredy Exist');
    }

    const CheckRegion = await this.RegionModel.findById(data.region);

    if (!CheckRegion) {
      throw new NotFoundException('Region Not Found');
    }

    data.type = data.type[0];

    if (data.type === 'ADMIN' && data.type.length !== 1) {
      throw new BadRequestException('Sorry, you cannot register as an Admin.');
    }

    let hash = bcrypt.hashSync(data.password, 7);

    data.password = hash;

    const newUser = await this.UserModel.create(data);

    return { message: 'Your Register Created Successfully', data: newUser };
  }

  async login(data: LoginDto) {
    const findUser = await this.UserModel.findOne({ phone: data.phone });

    if (!findUser) {
      throw new NotFoundException('User Not Found');
    }

    let ChechPassword = await bcrypt.compare(data.password, findUser.password);

    if (!ChechPassword) {
      throw new NotFoundException('Wrong Password');
    }

    let token = this.jwtService.sign({
      _id: findUser.password,
      type: findUser.type,
    });

    return { message: 'Login Successfully Completed', token };
  }

  async findAll() {
    let allUser = await this.UserModel.find().populate('region').exec();

    return { data: allUser };
  }

  async findOne(id: string) {
    const oneUser = await this.UserModel.findById(id).populate('region').exec();

    if (!oneUser) {
      throw new NotFoundException('User Not Found');
    }

    return { data: oneUser };
  }

  async update(id: string, data: UpdateUserDto) {
    const oneUser = await this.UserModel.findById(id);

    if (!oneUser) {
      throw new NotFoundException('User Not Found');
    }

    const CheckUser = await this.UserModel.findOne({ phone: data.phone });

    if (CheckUser) {
      throw new BadRequestException('This User Alredy Exist');
    }

    if (data.image) {
      deleteOldImage(oneUser.image);
    }

    const UpdatedUser = await this.UserModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    return { message: 'User Updated Succesfully', data: UpdatedUser };
  }

  async remove(id: string) {
    let CheckUser = await this.UserModel.findById(id);

    if (!CheckUser) {
      throw new NotFoundException('User Not Found');
    }

    const DeletedUser = await this.UserModel.findByIdAndDelete(id);

    return { message: 'User Deleted Succesfully', data: DeletedUser };
  }

  async query(data: any) {
    let {
      name,
      phone,
      region,
      shopName,
      location,
      page,
      limit,
      sortBy,
      order,
      ...filters
    } = data;

    const query: any = { ...filters };

    if (name) {
      query.name = name;
    }

    if (phone) {
      query.phone = phone;
    }

    if (region) {
      query.region = region;
    }

    if (shopName) {
      query.shopName = shopName;
    }

    if (location) {
      query.location = location;
    }

    const skip = (page - 1) * limit;

    return this.UserModel.find(query)
      .sort({
        [sortBy]: order === 'asc' ? 1 : -1,
      })
      .skip(skip)
      .limit(parseInt(limit, 10))
      .populate('region')
      .exec();
  }
}
