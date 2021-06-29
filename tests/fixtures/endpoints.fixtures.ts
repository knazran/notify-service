import { CreateEndpointDto } from '~/dto/CreateEndpoint.dto'

export const testCreateEndpointDto: CreateEndpointDto = {
  merchantID: 999,
  url: 'www.knazran.dev/webhooks/payments',
  event: 'invoice',
  secret: 'iWannaWorkAtXendit',
}
