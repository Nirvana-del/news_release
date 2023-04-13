import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Role } from './Role';
import { Region } from './Region';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true
  })
  username: string;

  @Column({select: false})
  password: string;

  @Column({
    type: 'boolean',
    default: true
  })
  roleState: boolean;

  @Column({
    type: 'boolean',
    default: false
  })
  userDefault: boolean;

  @ManyToOne(() => Region)
  region: Region;

  @ManyToOne(() => Role)
  role: Role;

  @Column()
  regionId: number;

  @Column()
  roleId: number;
}
