import axios, { AxiosResponse } from 'axios'
import { jobDataDTO } from '~/dto/JobData.dto'
export const notifyEndpoint = async function (jobData: jobDataDTO): Promise<any> {
  // Validate jobData payload here

  try {
    const url = jobData.data.url
    const secret = jobData.data['secret']
    const data = jobData.data['payload']

    // Set time out to wait for merchant server to be 10 seconds
    // Reference: https://www.dropbox.com/developers/reference/webhooks
    const res: AxiosResponse = await axios.post(url, { data: data }, { timeout: 10000, headers: {"x-xendit-notify": secret}})

    // Check status
    if (res.status === 200 || res.status === 201) {
      // Happy path
      return { status: 'ok', message: 'Message received' }
    }
  } catch(e) {
    if (e.response.status === 404) {
      return { status: 'error', message: 'Endpoint not found' }
    }

    if (e.response.status  === 408) {
      return { status: 'error', message: 'Request Timeout' }
    }

    if (e.response.status  === 500) {
      return { status: 'error', message: 'Server unavailable' }
    } else {
      return { status: 'error', message: 'Unexpected Error' }
    }
  }
}
