import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  @IsString()
  login: string;

  @Expose()
  @IsString()
  password: string;
}
