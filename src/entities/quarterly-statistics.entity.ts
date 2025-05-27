import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';

@Entity('quarterly_statistics')
@Unique(['userUuid', 'year', 'quarter'])
export class QuarterlyStatistics {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'user_uuid', type: 'uuid' })
  userUuid: string;

  @Column({ name: 'year', type: 'int' })
  year: number;

  @Column({ name: 'quarter', type: 'int' })
  quarter: number;

  @Column({ name: 'time_zone', type: 'jsonb' })
  timeZone: Record<string, number>;

  @Column({ name: 'body_part', type: 'jsonb' })
  bodyPart: Record<string, number>;

  @Column({ name: 'current_streak', type: 'int' })
  currentStreak: number;

  @Column({ name: 'longest_streak', type: 'int' })
  longestStreak: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
