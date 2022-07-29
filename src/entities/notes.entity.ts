import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Note } from './note.entity';

@Entity()
export class Notes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookTitle: string;

  @Column()
  notes: Note[];
}
