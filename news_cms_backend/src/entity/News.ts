import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from './Category';
import { Region } from './Region';
import { User } from './User';
import { AuditState, PermissionType, PublishState } from '../types';

@Entity()
export class News {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  label: string;

  @Column({
    type: 'int',
    default: AuditState.Draft
  })
  auditState: AuditState;

  @Column({
    type: 'int',
    default: PublishState.Unpublished
  })
  publishState: PublishState;

  @Column({
    default: 0
  })
  views: number;

  @Column({
    default: 0,
  })
  stars: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    nullable: true
  })
  publishTime: Date;

  @Column()
  content: string;

  @ManyToOne(() => Category)
  @JoinColumn()
  category: Category;

  @ManyToOne(() => Region)
  @JoinColumn()
  region: Region;

  @ManyToOne(() => User)
  author: User;

  @Column()
  regionId: number;

  @Column()
  authorId: string;

  @Column()
  categoryId: string;
}
