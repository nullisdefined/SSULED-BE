import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';

@Entity('daily_group_activity')
@Unique(['groupId', 'date'])
export class DailyGroupActivity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'group_id', type: 'int' })
  groupId: number;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'int', default: 0 })
  value: number; // ex: 참여자 수, 총 커밋 수 등

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
