import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  note: string;

  @AfterInsert()
  logInsert() {
    console.log(`Note with Id [${this.id}] was inserted`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Note with Id [${this.id}] was updated`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Note with Title [${this.title}] was removed`);
  }
}
