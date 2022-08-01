import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { AppRepository } from './repositories/app.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { AuthService } from './services/auth.service';
import { User } from './entities/user.entity';
import { AuthController } from './controllers/auth.controller';
import { APP_PIPE } from '@nestjs/core';

const cookieSession = require('cookie-session');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Note, User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Note, User]),
  ],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    AppRepository,
    AuthService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true }),
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ['qwerty'],
        }),
      )
      .forRoutes('*');
  }
}
