import { IsString} from 'class-validator'

export class jobDataDTO {
  @IsString()
  public id: string

  @IsString()
  public name: string

  public data: any
}
