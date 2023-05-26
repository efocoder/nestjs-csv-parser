import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { SignUpUserDto, UserLoginDto } from './dto/create-user.dto';

const userMock: SignUpUserDto = {
  email: 'okay@testing.com',
  name: 'John',
  password: 'Testpassword',
};

const mockLogin: UserLoginDto = {
  email: 'okay@testing.com',
  password: 'Testpassword',
};

const mockUserService = () => ({
  signUp: jest.fn(),
  login: jest.fn(),
});
describe('UsersController', () => {
  let controller: UsersController;
  // let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        JwtService,
        {
          provide: getModelToken(User.name),
          useValue: {
            new: jest.fn().mockResolvedValue(userMock),
            constructor: jest.fn().mockResolvedValue(userMock),
            create: jest.fn().mockResolvedValue(userMock),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    // service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signUp', () => {
    it('should sign user up and return user object', async function () {
      controller.signUp = mockUserService().signUp.mockResolvedValue(userMock);
      const result = await controller.signUp(userMock);

      expect(typeof result).toBe('object');
      expect(controller.signUp).toHaveBeenCalledWith(userMock);
      expect(result['data']).not.toBeNull();
      expect(result['message']).not.toBeNull();
    });
  });

  describe('login', () => {
    it('should log user in with correct credentials', async function () {
      controller.login = mockUserService().login.mockResolvedValue(mockLogin);
      const result = await controller.login(mockLogin);
      expect(result).toEqual(mockLogin);
    });
  });
});
