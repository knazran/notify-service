import { IsNumber, IsString, IsBoolean } from 'class-validator'

export class CreateNotificationDto {
  @IsNumber()
  public merchantID: number

  @IsBoolean()
  public isTest: boolean

  @IsString()
  public event: string

  public payload: Record<string, unknown>
}
