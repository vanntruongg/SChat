import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import authService from './auth.service';

interface ResponseData<T> {
  data: T;
  status: number;
}

export const axiosClient = axios.create({
  baseURL: 'http://localhost:8484',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig<any>,
  ): Promise<InternalAxiosRequestConfig<any>> => {
    const accessToken = authService.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.log('Error at interceptor request');
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse<any>): AxiosResponse<any> => {
    return response;
  },
  (error) => {
    console.log('Error at interceptor response');
    if (
      error.response.status === 401 &&
      error.response.data.message !== 'Bad credentials'
    ) {
      console.log('Refresh Token');
    }
    return Promise.reject(error);
  },
);
