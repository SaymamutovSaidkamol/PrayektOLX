import { InjectModel } from '@nestjs/mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Banner } from 'src/banners/entities/banner.entity';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private CommentModel: Model<Comment>,
    @InjectModel(Banner.name) private BannertModel: Model<Banner>,
  ) {}

  async create(data: CreateCommentDto) {
    const checkBanner = await this.BannertModel.findOne({ _id: data.banner });

    if (!checkBanner) {
      throw new NotFoundException('Banner Not Found');
    }

    const newComment = await this.CommentModel.create(data);

    await this.BannertModel.findByIdAndUpdate(data.banner, {
      $push: { comments: newComment._id },
    });

    return {
      message: 'Comment Created Succesfully',
      data: newComment,
    };
  }

  async findAll() {
    const allComment = await this.CommentModel.find().populate('banner');

    return { data: allComment };
  }

  async remove(id: string) {
    const checkComment = await this.CommentModel.findById(id);

    if (!checkComment) {
      throw new NotFoundException('Comment Not Found');
    }

    const deleteComment = await this.CommentModel.findByIdAndDelete(id);

    return { message: 'Comment Deleted Successfully', data: deleteComment };
  }

  async query(data: any) {
    let { star, name, page, limit, sortBy, order, ...filters } = data;

    const query: any = { ...filters };

    if (star) {
      query.star = star;
    }

    if (name) {
      query.name = name;
    }

    const skip = (page - 1) * limit;

    return this.CommentModel.find(query)
      .sort({
        [sortBy]: order === 'asc' ? 1 : -1,
      })
      .skip(skip)
      .limit(parseInt(limit, 10))
  }
}
