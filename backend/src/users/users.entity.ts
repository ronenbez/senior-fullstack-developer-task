import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Role } from '../roles/roles.entity';

export enum UserStatus {
  Enabled = 'Enabled',
  Disabled = 'Disabled',
  Deleted = 'Deleted'
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({
    type: 'text',
    enum: UserStatus,
    default: UserStatus.Enabled
  })
  status: UserStatus;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];
}
