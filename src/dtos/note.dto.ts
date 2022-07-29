import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class NoteDto {
  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsString()
  note: string;
}
