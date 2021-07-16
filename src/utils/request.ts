import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const options: AxiosRequestConfig = {
  baseURL: 'http://www.YourDomain.cn/api',
  timeout: 3000
}

const instance: AxiosInstance = Axios.create(options)

export default instance
