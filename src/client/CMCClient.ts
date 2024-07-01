import axios from 'axios';

export const createCMCClient = () => {
  console.log('process.env.CMC_API_KEY', process.env.EXPO_PUBLIC_CMC_API_KEY);
  const client = axios.create({
    //baseURL: 'https://sandbox-api.coinmarketcap.com/',
    baseURL: 'https://pro-api.coinmarketcap.com/',
    timeout: 10000,
    headers: {
      Accept: 'application/json',
      'X-CMC_PRO_API_KEY': process.env.EXPO_PUBLIC_CMC_API_KEY,
    },
  });

  client.interceptors.request.use((config) => {
    devlog(config.method, config.url, config.params || config.data);
    return config;
  }, devlog);
  client.interceptors.response.use((response) => {
    const { config, status } = response;
    devlog(status, config.method, config.url, config.params || config.data, response.data);
    return response;
  }, devlog);
  return client;
};

const devlog = !__DEV__ ? console.log : () => null;
