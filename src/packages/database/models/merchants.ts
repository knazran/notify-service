// tslint:disable:variable-name
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Timestamp, OneToMany } from 'typeorm'
import config from '~/config'
import { Endpoints } from './endpoints'

@Entity(`${config.DB.MAIN_SCHEMA}.merchants`)
export class Merchants extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  public email: string

  @OneToMany(() => Endpoints, (endpoint) => endpoint.merchant)
  endpoints: Endpoints[]

  @Column('timestamp with time zone')
  public created_at: Timestamp

  @Column('timestamp with time zone')
  public updated_at: Timestamp

  @Column('timestamp with time zone')
  public deleted_at: Timestamp
}
