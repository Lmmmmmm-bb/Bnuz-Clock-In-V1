import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const options: AxiosRequestConfig = {
  baseURL: 'http://localhost:3000/api',
  timeout: 3000
}

const instance: AxiosInstance = Axios.create(options)

export default instance
