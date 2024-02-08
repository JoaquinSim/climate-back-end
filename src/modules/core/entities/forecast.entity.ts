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
  export class ForecastEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @CreateDateColumn({
      name: 'created_at',
      type: 'date',
      default: () => 'CURRENT_TIME',
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
      name: 'temperature',
      type: 'float',
      nullable: false,
      comment: 'Temperatura en grados C°',
    })
    temperature: number;
  
    @Column({
      name: 'humidity',
      type: 'int',
      nullable: false,
      comment: 'Probabilidad de lluvia',
    })
    probability: number;
  }
  