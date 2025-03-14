import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @ApiProperty({ example: 'TV' })
  name?: string;

  @IsString()
  @ApiProperty({ example: 'image.jpg' })
  img?: string;
}
