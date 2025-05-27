import { RankingType } from '@/types/ranking.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('quarterly_ranking')
@Index(['groupId', 'year', 'quarter'], { unique: true })
export class QuarterlyRanking {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'type', type: 'enum', enum: RankingType })
  type: RankingType;

  @Column({ name: 'group_id', type: 'int' })
  groupId: number;

  @Column({ name: 'year', type: 'int' })
  year: number;

  @Column({ name: 'quarter', type: 'int' })
  quarter: number;

  @Column({ name: 'score', type: 'float' })
  score: number;

  @Column({ name: 'is_final', type: 'boolean', default: false })
  isFinal: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
