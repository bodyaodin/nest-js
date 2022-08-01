import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../services/app.service';
import { Note } from '../entities/note.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('AppService', () => {
  const notes: Note[] = [];
  notes.push({ id: 1, title: 'Fruit', note: 'Apple' } as Note);
  notes.push({ id: 2, title: 'Fruit', note: 'Banana' } as Note);

  let appService: AppService;
  let noteRepositoryMock: Partial<Repository<Note>>;

  beforeEach(async () => {
    noteRepositoryMock = {
      find: () => Promise.resolve(notes),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: getRepositoryToken(Note),
          useValue: noteRepositoryMock,
        },
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  describe('App service tests', () => {
    it('should return all notes', async () => {
      const actualNotes = await appService.getNotes();
      expect(actualNotes.length).toEqual(2);
      expect(actualNotes).toEqual(notes);
    });

    it('should throw an exception', async () => {
      noteRepositoryMock.find = () => Promise.resolve([]);
      await expect(appService.getNotes()).rejects.toThrow(NotFoundException);
    });
  });
});
