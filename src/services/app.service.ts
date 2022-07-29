import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from '../entities/note.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Note) private readonly appRepo: Repository<Note>,
  ) {}

  addNote(title: string, note: string): Promise<Note> {
    const newNote = this.appRepo.create({ title, note });
    return this.appRepo.save(newNote);
  }

  async getNotes(): Promise<Note[]> {
    const notes = await this.appRepo.find();
    if (!notes || notes.length === 0) {
      throw new NotFoundException('Notes were not found in DB');
    }
    return notes;
  }

  async getNote(id: number): Promise<Note> {
    const note = await this.appRepo.findOne({ where: { id } });
    if (!note) {
      throw new NotFoundException(`Note with Id [${id}] was not found in DB`);
    }
    return note;
  }

  async updateNote(id: number, newNote: Partial<Note>): Promise<Note> {
    const note = await this.appRepo.findOne({ where: { id } });
    if (!note) {
      throw new NotFoundException(`Note with Id [${id}] was not found in DB`);
    }
    Object.assign(note, newNote);
    return this.appRepo.save(note);
  }

  async removeNote(id: number): Promise<Note> {
    const note = await this.appRepo.findOne({ where: { id } });
    if (!note) {
      throw new NotFoundException(`Note with Id [${id}] was not found in DB`);
    }
    return this.appRepo.remove(note);
  }
}
