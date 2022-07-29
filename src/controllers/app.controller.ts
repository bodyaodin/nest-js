import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { NoteDto } from '../dtos/note.dto';
import { AppService } from '../services/app.service';
import { Note } from '../entities/note.entity';
import { Serialize } from '../interceptors/serialize.interceptor';

@Serialize(NoteDto)
@Controller('/notes')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async addNote(@Body() newNote: NoteDto): Promise<Note> {
    return await this.appService.addNote(newNote.title, newNote.note);
  }

  @Get()
  async getNotes(): Promise<Note[]> {
    return await this.appService.getNotes();
  }

  @Get('/:id')
  async getNote(@Param('id') id: number): Promise<Note> {
    return await this.appService.getNote(id);
  }

  @Patch(':id')
  async updateNote(
    @Param('id') id: number,
    @Body() newNote: Partial<NoteDto>,
  ): Promise<Note> {
    return await this.appService.updateNote(id, newNote);
  }

  @Delete(':id')
  async removeNote(@Param('id') id: number): Promise<Note> {
    return await this.appService.removeNote(id);
  }
}
