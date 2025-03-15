import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateLikeDto {
    @IsString()
    @ApiProperty({example: "67d4a159315b5aa64d108641"})
    banner: string

    @IsString()
    user: string
}
