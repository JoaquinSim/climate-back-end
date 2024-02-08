import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  Decimal128,
} from 'typeorm';

@Entity('climate')
export class ClimateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: false,
  })
  deletedAt: Date;

  @Column({
    name: 'city',
    type: 'varchar',
    nullable: false,
    comment: 'Nombre de la ciudad',
  })
  city: string;

  @Column({
    name: 'temperature',
    type: 'float',
    nullable: false,
    comment: 'Temperatura en grados C°',
  })
  temperature: number;

  @Column({
    name: 'volumen',
    type: 'float',
    nullable: false,
    comment: 'Volumen de precipitacion',
  })
  volumen: number;

  @Column({
    name: 'pressure',
    type: 'float',
    nullable: false,
    comment: 'Presion atmosferica',
  })
  pressure: number;

  @Column({
    name: 'humidity',
    type: 'int',
    nullable: false,
    comment: 'Porcentaje de atmosferica',
  })
  humidity: number;

  @Column({
    name: 'velocity',
    type: 'float',
    nullable: false,
    comment: 'Velocidad del viento',
  })
  velocity: number;

  @Column({
    name: 'time',
    type: 'datetime',
    nullable: false,
    comment: 'Fecha de toma de los tados',
  })
  time: Date;
}
