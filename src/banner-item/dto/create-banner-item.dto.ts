import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateBannerItemDto {
  @IsString()
  @ApiProperty({ example: '67d4a1c02f45195f96113c25' })
  banner: string;

  @IsArray({each: true})
  @ApiProperty({
    example: ['67d3d4abddcbfbff3f1df811', '67d3d4b6ddcbfbff3f1df814'],
  })
  region: string[];
}
