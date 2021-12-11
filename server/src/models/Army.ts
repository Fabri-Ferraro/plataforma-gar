import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import Operation from './Operation';

@Entity('armies')
class Army {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_operation: string;

  @ManyToOne(() => Operation)
  @JoinColumn({ name: 'id_operation' })
  operation: Operation;

  @Column()
  army: string;

  @Column()
  description: string;

  @Column()
  loadout_description: string;

  @Column()
  logo: string;

  @Column()
  loadout: string;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Army;
