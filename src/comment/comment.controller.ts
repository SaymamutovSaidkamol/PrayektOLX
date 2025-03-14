import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

    @ApiOperation({
      summary: 'Hududlarni qidirish',
      description: 'Berilgan parametrlar bo‘yicha hududlarni qidirish',
    })
    @ApiResponse({ status: 200, description: 'Muvaffaqiyatli bajarildi' })
    @ApiResponse({ status: 400, description: 'Noto‘g‘ri so‘rov' })
    @ApiQuery({ name: 'name', required: false, type: String })
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
    @ApiQuery({ name: 'sortBy', required: false, type: String, example: 'name' })
    @ApiQuery({
      name: 'order',
      required: false,
      type: String,
      enum: ['asc', 'desc'],
      example: 'asc',
    })
  @Get('/query')
  query(@Query() data: any){
    return this.commentService.query(data)
  }

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(id);
  }
}
