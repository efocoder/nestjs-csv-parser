import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class SignUpUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Length(6, 32)
  password: string;
}

export class UserLoginDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
