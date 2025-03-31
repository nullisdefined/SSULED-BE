import { SocialProvider } from '@/types/social-provider.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'user_uuid', type: 'uuid', unique: true })
  userUuid: string;

  @Column({ name: 'nickname', type: 'varchar' })
  nickname: string;

  @Column({ name: 'profile_image', type: 'varchar', nullable: true })
  profileImage: string;

  @Column({ name: 'social_provider', type: 'enum', enum: SocialProvider })
  socialProvider: SocialProvider;

  @Column({ name: 'social_id', type: 'varchar', nullable: true })
  socialId: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
