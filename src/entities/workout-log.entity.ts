import { BodyPartEnum } from '@/types/body-part.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';

@Entity('workout_log')
@Unique(['postId', 'userUuid', 'bodyPart'])
export class WorkoutLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'post_id', type: 'int' })
  postId: number;

  @Column({ name: 'user_uuid', type: 'uuid' })
  userUuid: string;

  @Column({ name: 'body_part', type: 'simple-array' })
  bodyPart: BodyPartEnum[];

  @Column({ name: 'duration', type: 'integer' })
  duration: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
