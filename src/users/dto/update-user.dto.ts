import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @ApiProperty({ example: 'Saidkamol' })
  name?: string;

  @IsPhoneNumber('UZ')
  @ApiProperty({ example: '+998901234567' })
  phone?: string;

  @IsString()
  @ApiProperty({ example: 'Developper' })
  shopName?: string;

  @IsString()
  @ApiProperty({ example: 'Namangan' })
  location?: string;

  @IsString()
  @ApiProperty({ example: 'example.jpg' })
  image?: string;
}
