import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateRegionDto {
  @IsString()
  @ApiProperty({ example: 'Namangan' })
  name?: string;
}
