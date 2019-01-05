import axios from 'axios';

import config from '../config';
import Storage from './storage';

const client = () => {
  const options = {
    baseURL: config.apiUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return axios.create(options);
};

const request = client();

// For requests with authorization, we need to set the access token before each request
// using interceptors
const authRequest = client();
authRequest.interceptors.request.use((requestConfig) => {
  const token = Storage.getAccessToken();
  const cfg = requestConfig;
  cfg.headers.Authorization = token ? `Bearer ${token}` : '';

  return cfg;
});


export { request, authRequest };
