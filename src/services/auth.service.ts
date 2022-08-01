import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly authRepo: Repository<User>,
  ) {}

  async signup(login: string, password: string): Promise<User> {
    const user = await this.authRepo.findOne({ where: { login } });
    if (user) {
      throw new BadRequestException(
        `User with Login [${login}] already exists`,
      );
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    const newUser = this.authRepo.create({ login: login, password: result });
    return this.authRepo.save(newUser);
  }

  async signin(login: string, password: string): Promise<User> {
    const user = await this.authRepo.findOne({ where: { login } });
    if (!user) {
      throw new NotFoundException(`User with Login [${login}] not found`);
    }

    const [salt, hash] = user.password.split('.');
    const newHash = (await scrypt(password, salt, 32)) as Buffer;
    if (hash !== newHash.toString('hex')) {
      throw new ForbiddenException('Access denied!');
    }

    return user;
  }
}
