import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity()
@Index(['roleId', 'rightId'], { unique: true })
export class RoleRightKey {
  constructor(roleId: string, rightId: string) {
    this.roleId = roleId;
    this.rightId = rightId;
  }
  @PrimaryColumn()
  roleId: string;

  @PrimaryColumn()
  rightId: string;
}
