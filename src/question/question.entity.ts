import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type Choice = {
  label: string;
  value: string;
};

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  question: string;

  @Column()
  choices: Choice[];

  @Column()
  correctChoice: string;
}
