import { PartialType } from '@nestjs/mapped-types';
import { SignUpUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(SignUpUserDto) {}
