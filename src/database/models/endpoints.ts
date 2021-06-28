// tslint:disable:variable-name
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Timestamp, OneToMany } from 'typeorm'
import { EndpointStatus } from './enums'
import { Notifications } from './notifications'
import config from '~/config'

@Entity(`${config.DB.MAIN_SCHEMA}.endpoints`)
export class Endpoints extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  // stub for merchantID
  @Column('int')
  public merchantID: number

  @Column('varchar')
  public url: string

  @Column('varchar')
  public event: string

  @Column('varchar')
  public secret: string

  @Column({
    type: 'enum',
    enum: EndpointStatus,
    default: EndpointStatus.ACTIVE,
  })
  public status: EndpointStatus

  @OneToMany(() => Notifications, (notification) => notification.endpoint)
  notifications: Notifications[]

  @Column({ type: 'timestamp with time zone', default: () => "now()"})
  public created_at: Timestamp

  @Column({ type: 'timestamp with time zone', default: () => "now()"})
  public updated_at: Timestamp

  @Column({ type: 'timestamp with time zone', default: () => "now()", nullable: true})
  public deleted_at: Timestamp
}
