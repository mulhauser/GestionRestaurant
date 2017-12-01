export const environment = {
  production: false,
  backend: {
    protocol: 'http',
    host: '127.0.0.1',
    port: '4443',
    endpoints: {
      allRoom: '/api/room',
      allStock: '/api/stock',
      oneStock: '/api/stock/:id'
    }
  }
};
