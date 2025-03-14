import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ example: 'Saidkamol' })
  name: string;

  @IsPhoneNumber('UZ')
  @ApiProperty({ example: '+998901234567' })
  phone: string;

  @IsArray()
  @ApiProperty({ example: ['ADMIN', 'SALERY', 'RECIPIENT'] })
  type: string;

  @IsString()
  @ApiProperty({ example: '67d3d4abddcbfbff3f1df811' })
  region: string;

  @IsString()
  @ApiProperty({ example: 'Developper' })
  shopName: string;

  @IsString()
  @ApiProperty({ example: 'Namangan' })
  location: string;

  @IsString()
  @ApiProperty({ example: 'example.jpg' })
  image: string;

  @IsString()
  @MinLength(5, { message: 'Parol kamida 5 ta belgi bulishi shart' })
  @Matches(/(?=.*[a-z])/, { message: 'Parolda kamida bitta kichik harf bo‘lishi kerak!' })
  @Matches(/(?=.*[A-Z])/, { message: 'Parolda kamida bitta katta harf bo‘lishi kerak!' })
  @Matches(/(?=.*\d)/, { message: 'Parolda kamida bitta raqam bo‘lishi kerak!' })
  @Matches(/(?=.*[@$!%*?&])/, { message: 'Parolda kamida bitta maxsus belgi bo‘lishi kerak!' })
  @ApiProperty({ example: 'Salom1!' })
  @IsNotEmpty({ message: 'Parol kiritish shart!' })
  password: string;
}


export class LoginDto {
  @IsPhoneNumber('UZ')
  @ApiProperty({ example: '+998901234567' })
  phone: string;

  @IsString()
  @MinLength(5, { message: 'Parol kamida 5 ta belgi bulishi shart' })
  @Matches(/(?=.*[a-z])/, { message: 'Parolda kamida bitta kichik harf bo‘lishi kerak!' })
  @Matches(/(?=.*[A-Z])/, { message: 'Parolda kamida bitta katta harf bo‘lishi kerak!' })
  @Matches(/(?=.*\d)/, { message: 'Parolda kamida bitta raqam bo‘lishi kerak!' })
  @Matches(/(?=.*[@$!%*?&])/, { message: 'Parolda kamida bitta maxsus belgi bo‘lishi kerak!' })
  @ApiProperty({ example: 'Salom1!' })
  @IsNotEmpty({ message: 'Parol kiritish shart!' })
  password: string;
}
