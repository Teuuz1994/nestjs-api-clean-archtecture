import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';

import { UserModel } from '@/modules/users/domain/models/UserModel';
import { GenerateUuidAdapter } from '../../generator/id-generator';

@Entity('users')
export class User implements UserModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @BeforeInsert()
  incrementUuid() {
    this.id = GenerateUuidAdapter.generate();
  }
}
