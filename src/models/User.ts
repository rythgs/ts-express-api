import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import config from '../config'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  firstName: string

  @Column({ nullable: true })
  lastName: string

  @Column({ unique: true, nullable: false })
  email: string

  @Column({ select: false })
  private password: string

  @Column({ default: true })
  isActive: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  token() {
    return jwt.sign({ sub: this.id }, config.jwtSecret, {
      expiresIn: config.jwtExpirationInterval,
    })
  }

  async validatePassword(plainTextPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, this.password)
  }

  @BeforeInsert()
  async hashPassword() {
    const rounds = config.env === 'development' ? 1 : 10
    this.password = await bcrypt.hash(this.password, rounds)
  }
}

export default User
