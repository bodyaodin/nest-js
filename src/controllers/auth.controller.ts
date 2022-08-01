import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { User } from '../entities/user.entity';
import { UserDto } from '../dtos/user.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @UseInterceptors(ClassSerializerInterceptor)
  async signup(@Body() body: UserDto, @Session() session: any): Promise<User> {
    const user = await this.authService.signup(body.login, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  @UseInterceptors(ClassSerializerInterceptor)
  async signin(@Body() body: UserDto, @Session() session: any): Promise<User> {
    const user = await this.authService.signin(body.login, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/singout')
  signout(@Session() session: any) {
    session.userId = null;
  }

  @Get('/whoami')
  whoAmI(@Session() session: any) {
    // return this.authService.findUser(session.userId);
  }
}
