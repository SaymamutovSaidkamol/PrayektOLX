import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Regions') // API nomi
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Get('/query')
  @ApiOperation({ summary: 'Hududlarni qidirish', description: 'Berilgan parametrlar bo‘yicha hududlarni qidirish' })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli bajarildi' })
  @ApiResponse({ status: 400, description: 'Noto‘g‘ri so‘rov' })
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'sortBy', required: false, type: String, example: 'name' })
  @ApiQuery({ name: 'order', required: false, type: String, enum: ['asc', 'desc'], example: 'asc' })
  query(@Query() data: any) {
    return this.regionService.query(data);
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createRegionDto: CreateRegionDto, @Req() req: Request) {
    return this.regionService.create(createRegionDto, req);
  }

  @Get()
  findAll() {
    return this.regionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto, @Req() req: Request) {
    return this.regionService.update(id, updateRegionDto, req);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.regionService.remove(id, req);
  }
}
