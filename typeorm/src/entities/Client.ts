import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import { Transaction } from './Transaction'
import { Person } from './utils/Person'

@Entity('client')
export class Client extends Person {
  @Column({ default: true, name: 'active' })
  isActive: boolean

  @Column({ type: 'simple-json', nullable: true })
  additionalInfo: {
    age: number
    hair_color: string
  }

  @Column({ type: 'simple-array', default: [] })
  familyMembers: string[]

  @Column()
  balance: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => Transaction, (transaction) => transaction.client)
  transactions: Transaction[]
}
