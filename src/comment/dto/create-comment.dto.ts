import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @ApiProperty({ example: 'Salom hammaga' })
  name: string;

  @IsNumber()
  @ApiProperty({ example: 5 })
  star: number;

  @IsNumber()
  @ApiProperty({ example: "67d4a159315b5aa64d108641" })
  banner: string;

  @IsNumber()
  @ApiProperty({ example: "67d4a159315b5aa64d108641" })
  user: string;
}
