import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpUserDto, UserLoginDto } from './dto/create-user.dto';
import { createResponse, CreateResponseType } from '../utils/shared';
import { UserGuard } from './user.guard';

@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async singUp(
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

  @UseGuards(UserGuard)
  @Get()
  list() {
    return 'Hello World';
  }
}
