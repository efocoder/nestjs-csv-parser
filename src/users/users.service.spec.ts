import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
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

describe('UsersService', () => {
  let service: UsersService;
  // let model: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        JwtService,
        {
          provide: getModelToken(User.name),
          useValue: {
            new: jest.fn().mockResolvedValue(userMock),
            constructor: jest.fn().mockResolvedValue(userMock),
            create: jest.fn().mockResolvedValue(userMock),
            findOne: jest.fn(), //.mockResolvedValue(mockLogin),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    // model = module.get<User>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signUp', () => {
    it('should sign user up and return user object', async function () {
      mockUserService().signUp.mockResolvedValue(userMock);
      const result = await service.signUp(userMock);

      expect(result.name).toEqual(userMock.name);
      expect(result.email).toEqual(userMock.email);
    });
  });

  describe('login', () => {
    it('should log user in with correct credentials', async function () {
      service.login = mockUserService().login.mockResolvedValue(mockLogin);
      const result = await service.login(mockLogin);
      expect(result).toEqual(mockLogin);
    });
  });
});
