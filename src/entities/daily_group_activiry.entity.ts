import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('daily_group_activity')
export class DailyGroupActivity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'group_id', type: 'int' })
  groupId: number;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'int', default: 0 })
  value: number; // ex: 참여자 수, 총 커밋 수 등

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
