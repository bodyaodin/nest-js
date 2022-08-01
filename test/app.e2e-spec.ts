import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Note } from '../src/entities/note.entity';

describe('AppController (e2e)', () => {
  const notes: Note[] = [];
  notes.push({ title: 'Fruit', note: 'Melon' } as Note);
  notes.push({ title: 'Fruit', note: 'Apple' } as Note);

  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return all notes', () => {
    return request(app.getHttpServer())
      .get('/notes')
      .expect(200)
      .expect(notes);
  });
});
