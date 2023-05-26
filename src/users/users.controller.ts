import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpUserDto, UserLoginDto } from './dto/create-user.dto';
import { createResponse, CreateResponseType } from '../utils/shared';

@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async signUp(
    @Body() signUpUserDto: SignUpUserDto,
  ): Promise<CreateResponseType> {
    return createResponse(
      HttpStatus.CREATED,
      'Sign up successful',
      await this.usersService.signUp(signUpUserDto),
    );
  }

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    return await this.usersService.login(userLoginDto);
  }
}
