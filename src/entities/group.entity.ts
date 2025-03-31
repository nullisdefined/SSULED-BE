import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('group')
export class Group {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'owner_uuid', type: 'uuid' })
  ownerUuid: string;

  @Column({ name: 'member_uuid', type: 'uuid', array: true, default: '{}' })
  memberUuid: string[];

  @Column({ name: 'title', type: 'varchar' })
  title: string;

  @Column({ name: 'password', type: 'varchar', nullable: true })
  password: string;

  @Column({ name: 'is_accessible', type: 'boolean', default: true })
  isAccessible: boolean;

  @Column({ name: 'max_member', type: 'int', default: 4 })
  maxMember: number;

  @Column({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
