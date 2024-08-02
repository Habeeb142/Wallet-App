import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsEmail, IsString } from "class-validator"

export class SignInDto {  
    @ApiPropertyOptional({ description: 'The password of the user', example: 'Test@123' })
    @IsString()
    password: string;

    @ApiPropertyOptional({ description: 'The Account ID of the user', example: '2100501445' })
    @IsString()
    accountId: string;
  }