import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const options: AxiosRequestConfig = {
  baseURL: 'http://www.YourApiDomain.cn',
  timeout: 3000
}

const instance: AxiosInstance = Axios.create(options)

export default instance
