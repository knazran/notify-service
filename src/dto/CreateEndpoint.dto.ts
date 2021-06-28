import { IsNumber, IsUrl, IsString } from 'class-validator'

export class CreateEndpointDto {
  @IsNumber()
  public merchantID: number

  @IsUrl()
  public url: string

  @IsString()
  public event: string

  @IsString()
  public secret: string
}
