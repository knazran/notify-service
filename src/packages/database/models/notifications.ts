// tslint:disable:variable-name
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Timestamp, ManyToOne } from 'typeorm'
import { NotificationStatus } from './enums'
import { Endpoints } from './endpoints'
import config from '~/config'

@Entity(`${config.DB.MAIN_SCHEMA}.notifications`)
export class Notifications extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  public url: string

  @Column('varchar')
  public event: string

  @Column({
    type: 'enum',
    enum: NotificationStatus,
    default: NotificationStatus.PENDING,
  })
  public status: NotificationStatus

  @ManyToOne(() => Endpoints, (endpoint) => endpoint.notifications)
  endpoint: Endpoints

  @Column('boolean')
  public is_deleted: boolean

  @Column('timestamp with time zone')
  public created_at: Timestamp

  @Column('timestamp with time zone')
  public updated_at: Timestamp

  @Column('timestamp with time zone')
  public deleted_at: Timestamp
}
