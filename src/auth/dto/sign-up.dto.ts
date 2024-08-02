import { IsEmail, IsPhoneNumber, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger";
import { SignInDto } from "./sign-in.dto";

export class SignUpDto {
    @ApiProperty({ description: 'The phone number of the user', example: '+2348132722019' })
    @IsPhoneNumber()
    phoneNumber: string;

    @ApiProperty({ description: 'The first name of the user', example: 'John' })
    @IsString()
    firstName: string;

    @ApiProperty({ description: 'The last name of the user', example: 'Doe' })
    @IsString()
    lastName: string;

    @ApiProperty({ description: 'The email address of the user', example: 'user@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'The BVN of the user', example: '2233445566' })
    @IsString()
    bvn: string;

    @ApiProperty({ description: 'The password of the user', example: 'Test@123' })
    @IsString()
    password: string;
}