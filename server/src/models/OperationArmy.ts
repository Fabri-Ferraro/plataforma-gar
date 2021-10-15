import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Army from './Army';
import Operation from './Operation';

@Entity('operation_armies')
class OperationArmy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_operation: string;

  @ManyToOne(() => Operation)
  @JoinColumn({ name: 'id_operation' })
  operation: Operation;

  @Column()
  id_army: string;

  @ManyToOne(() => Army)
  @JoinColumn({ name: 'id_army' })
  army: Army;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OperationArmy;
