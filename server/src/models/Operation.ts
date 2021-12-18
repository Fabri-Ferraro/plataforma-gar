import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('operations')
class Operation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  operation: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column()
  price: number;

  @Column()
  logo: string;

  @Column()
  field_name: string;

  @Column()
  address: string;

  @Column()
  number: string;

  @Column()
  complement: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  reference: string;

  @Column()
  zip_code: string;

  @Column()
  mgrs: string;

  @Column()
  state: string;

  @Column()
  status: string;


  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Operation;
