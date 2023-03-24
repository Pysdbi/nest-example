import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity } from '../../base-entity';
import { Validate } from '../../lib/validate';

@Entity('companies')
export class Company extends BaseEntity {
  @Validate.Number()
  @PrimaryGeneratedColumn()
  id?: number;

  @Validate.String({ maxLength: 100, notEmpty: true })
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Validate.String({ maxLength: 100, notEmpty: true })
  @Column({ type: 'varchar', length: 100, nullable: false })
  domain: string;

  @Validate.String({ maxLength: 100, notEmpty: true })
  @Column({ type: 'text', nullable: true, default: null })
  description: string;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  /**
   * Relations
   */
}
