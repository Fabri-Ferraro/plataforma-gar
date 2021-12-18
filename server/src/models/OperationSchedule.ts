import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Operation from './Operation';

@Entity('operation_schedule')
class OperationSchedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_operation: string;

  @ManyToOne(() => Operation)
  @JoinColumn({ name: 'id_operation' })
  operation: Operation;

  @Column()
  schedule: string;

  @Column()
  value: string;

  @Column()
  order: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OperationSchedule;
