import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpUserDto, UserLoginDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpUserDto: SignUpUserDto): Promise<any> {
    try {
      const { password } = signUpUserDto;
      signUpUserDto.password = await User.hashPassword(password);
      const user: User = await this.userModel.create(signUpUserDto);

      return User.response(user);
    } catch (error) {
      this.logger.error(error);
      if ((error.code = 11000))
        throw new BadRequestException({ email: 'Email already exist' });
      else throw new InternalServerErrorException('Something went wrong');
    }
  }

  async login(userLoginDto: UserLoginDto): Promise<any> {
    const { email, password } = userLoginDto;

    try {
      const user = await this.userModel.findOne({ email: email });
      if (user == null) this.handleException();

      if (await User.checkPassword(password, user)) {
        const payload = { userId: user._id };
        return {
          statusCode: HttpStatus.OK,
          message: 'Login Successful',
          token: await this.jwtService.signAsync(payload),
        };
      } else this.handleException();
    } catch (error) {
      this.logger.log(error);
      this.handleException();
    }
  }

  private handleException() {
    throw new UnauthorizedException('Invalid credentials');
  }
}
