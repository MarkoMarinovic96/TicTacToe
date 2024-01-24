/* eslint-disable no-param-reassign */
import Axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { storage } from './storage';

export const axios = Axios.create({
  baseURL: 'https://tictactoe.aboutdream.io/'
});

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = storage.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}

function authResResponseInterceptor(response: AxiosResponse) {
  return response.data;
}

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(authResResponseInterceptor);
