import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { NoteDto } from '../dtos/note.dto';

@Injectable()
export class AppRepository {
  path: string = join(__dirname, '..', '..', 'src', 'notes.json');

  async addNote(newNote: NoteDto): Promise<string> {
    const notesStr = await readFile(this.path, 'utf8');
    const notesObj = JSON.parse(notesStr);

    notesObj.notes.push(newNote.note);

    const newNoteStr = JSON.stringify(notesObj);
    await writeFile(this.path, newNoteStr);

    return `Note with Title [${newNote.title}] was saved to file`;
  }

  async getNotes(): Promise<string[]> {
    const notesStr = await readFile(this.path, 'utf8');
    return JSON.parse(notesStr).notes;
  }

  async getNote(id: number): Promise<string> {
    const notesStr = await readFile(this.path, 'utf8');
    return JSON.parse(notesStr).notes[id];
  }
}
