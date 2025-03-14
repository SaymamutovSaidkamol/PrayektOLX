import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @ApiProperty({example: "Saidkamol"})
    name: string

    @IsString()
    @ApiProperty({example: "+99891234567"})
    phone: string

    @IsString()
    @ApiProperty({example: ["ADMIN", "SALERY", "RECIPIENT"]})
    type: string

    @IsString()
    @ApiProperty({example: "67d3e5e2a3ea915ce1b7bf75"})
    region: string

    @IsString()
    @ApiProperty({example: "Developper"})
    shopName: string

    @IsString()
    @ApiProperty({example: "Namangan"})
    location: string

    @IsString()
    @ApiProperty({example: "example.jpg"})
    image: string

}
