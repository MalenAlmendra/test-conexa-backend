import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsString } from "class-validator"

export class CreateUserDto{
    @ApiProperty()
    @IsString()
    username: string

    @ApiProperty()
    @IsString()
    password: string

    @ApiProperty()
    @IsBoolean()
    isAdmin: boolean
  }

export class UserTokenDto{
    @ApiProperty()
    @IsString()
    access_token:string
}