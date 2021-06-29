import { IsNumber, IsUrl, IsString } from 'class-validator'

export class TestNotificationDto {
  @IsNumber()
  public endpointID: string

  public payload: Record<string, unknown>
}
