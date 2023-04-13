import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { News } from './News';
 
@Entity()
export class Category {
  constructor(label: string, value: string) {
    this.label = label;
    this.value = value;
  }
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column({
    unique: true
  })
  label: string;
 
  @Column()
  value: string;

  // @OneToMany(() => News, (news: News) => news.category)
  // newsList: News[]
}