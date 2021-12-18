import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  nickname: string;

  @Column()
  email: string;

  @Column()
  birth_date: Date;

  @Column()
  team: string;

  @Column()
  contact_phone: number;

  @Column()
  emergency_contact_name: string;

  @Column()
  emergency_contact_phone: number;

  @Column()
  blood_type: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
