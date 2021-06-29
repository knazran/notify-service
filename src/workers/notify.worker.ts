import axios, { AxiosResponse } from 'axios'

export const notifyEndpoint = async function (jobData): Promise<any> {
  // Validate jobData payload here

  // try {
    const url = jobData.data.url
    const data = jobData.data.payload

    // Set time out to wait for merchant server to be 10 seconds
    // Reference: https://www.dropbox.com/developers/reference/webhooks
    const res:AxiosResponse = await axios.post(url, {data: data}, { timeout: 10000} )
    
    // Check status
    if (res.status === 200 || res.status === 201){
        // Happy path
        return {status: 'ok', message: "Message received"}
    } 
    
    if (res.status === 404){
        return {status: 'error', message: "Invalid endpoint"}
    }

    if (res.status === 408){
        return {status: 'error', message: "Request Timeout"}
    }

    if (res.status === 500){
        return {status: 'error', message: "Server unavailable"}
    }
  // } 
}
