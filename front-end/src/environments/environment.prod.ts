export const environment = {
  production: false,
  backend: {
    protocol: 'http',
    host: '127.0.0.1',
    port: '4443',
    endpoints: {
      allStock: '/api/ingredient',
      randomStock: '/api/stock/random',
      oneStock: '/api/ingredient/:id'
    }
  }
};
