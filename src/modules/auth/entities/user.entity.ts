import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as Bcrypt from 'bcrypt';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: false,
  })
  deletedAt: Date;

  @Column({
    name: 'email',
    type: 'varchar',
    nullable: false,
    unique: true,
    comment: 'Correo Electronico',
  })
  email: string;

  @Column({
    name: 'lastname',
    type: 'varchar',
    nullable: false,
    comment: 'Apellidos',
  })
  lastname: string;

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
    comment: 'Nombres',
  })
  name: string;

  @Exclude()
  @Column({
    name: 'password',
    type: 'varchar',
    nullable: false,
    comment: 'Contraseña',
  })
  password: string;

  /** Before Actions **/
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password || this.password?.length > 30) {
      return;
    }

    this.password = await Bcrypt.hash(this.password, 10);
  }
}
