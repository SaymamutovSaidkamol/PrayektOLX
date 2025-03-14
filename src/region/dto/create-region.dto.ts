import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRegionDto {
  @IsString()
  @ApiProperty({ example: 'Namangan' })
  name: string;
}

