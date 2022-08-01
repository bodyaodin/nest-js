import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { AppRepository } from './repositories/app.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { AuthService } from './services/auth.service';
import { User } from './entities/user.entity';
import { AuthController } from './controllers/auth.controller';

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
  providers: [AppService, AppRepository, AuthService],
})
export class AppModule {}
