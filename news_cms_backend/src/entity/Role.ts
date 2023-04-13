import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany } from 'typeorm';
import { UserRole } from '../types';
import { Right } from './Right';
import { SubRight } from './SubRight';

@Entity()
export class Role {
  constructor(roleName: string, roleType: UserRole) {
    this.roleName = roleName;
    this.roleType = roleType;
  }

  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    unique: true,
  })
  roleName: string;

  @Column({
    unique: true,
  })
  roleType: UserRole;

  @ManyToMany(() => Right)
  // @JoinTable()
  rightList: Right[];

  @ManyToMany(() => SubRight)
  // @JoinTable()
  subRightList: SubRight[];

  pathList: string[];
}
