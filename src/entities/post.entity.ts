import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'title', type: 'varchar', nullable: true })
  title: string;

  @Column({ name: 'user_uuid', type: 'uuid' })
  userUuid: string;

  @Column({ name: 'content', type: 'varchar', nullable: true })
  content: string;

  @Column({ name: 'image_url', type: 'simple-array' })
  imageUrl: string[];

  @Column({ name: 'is_public', type: 'boolean', default: true })
  isPublic: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
