// tslint:disable:variable-name
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Timestamp, ManyToOne } from 'typeorm'
import { NotificationStatus } from './enums'
import { Endpoints } from './endpoints'
import config from '~/config'

@Entity(`${config.DB.MAIN_SCHEMA}.notifications`)
export class Notifications extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('json')
  public payload: Record<string, unknown>

  @Column('varchar')
  public event: string

  @Column('bool')
  public is_test: boolean

  @Column({
    type: 'enum',
    enum: NotificationStatus,
    default: NotificationStatus.PENDING,
  })
  public status: NotificationStatus

  @ManyToOne(() => Endpoints, (endpoint) => endpoint.notifications)
  endpoint: Endpoints

  @Column({ type: 'timestamp with time zone', default: () => "now()"})
  public created_at: Timestamp

  @Column({ type: 'timestamp with time zone', default: () => "now()"})
  public updated_at: Timestamp

  @Column({ type: 'timestamp with time zone', default: () => "now()", nullable: true})
  public deleted_at: Timestamp
}
