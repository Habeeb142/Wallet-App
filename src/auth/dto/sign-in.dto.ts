import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsEmail, IsString } from "class-validator"

export class SignInDto {  
    @ApiPropertyOptional({ description: 'The password of the user', example: 'strongPassword123' })
    @IsString()
    password: string;

    @ApiPropertyOptional({ description: 'The BVN of the user', example: '2233445566' })
    @IsString()
    bvn: string;
  }