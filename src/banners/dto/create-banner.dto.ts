import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateBannerDto {
  @IsString()
  @ApiProperty({ example: 'Televizor' })
  name: string;

  @IsNumber()
  @ApiProperty({ example: '23000' })
  price: number;

  @IsString()
  @ApiProperty({ example: 'example.jpg' })
  image: string;

  @IsString()   
  @ApiProperty({ example: '67d4a1335e4adab7903ab275',  })
  category: string;

  @IsString()
  @ApiProperty({ example: '67d3d4abddcbfbff3f1df811' })
  region: string;
  @IsString()

  @ApiProperty({ example: '67d3d4abddcbfbff3f1df811' })
  user: string;
}
