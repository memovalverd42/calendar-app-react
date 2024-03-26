import axios, { AxiosRequestHeaders } from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
  baseURL: VITE_API_URL
});

///// TODO: configurar interceptores
calendarApi.interceptors.request.use( config => {

  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem('token'),
  } as unknown as AxiosRequestHeaders;

  return config;

});

export default calendarApi;