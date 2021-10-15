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
import User from './User';

@Entity('operation_army_users')
class OperationArmyUser {
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
  id_user: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OperationArmyUser;
