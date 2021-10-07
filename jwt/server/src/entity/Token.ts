import {
  BaseEntity,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm'
import { User } from './User'

@Entity()
export class Token extends BaseEntity {
  @PrimaryColumn()
  refreshToken: string

  @OneToOne((type) => User, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  user: User
}
