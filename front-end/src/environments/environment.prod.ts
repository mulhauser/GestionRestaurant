export const environment = {
  production: true,
  backend: {
    protocol: 'http',
    host: '127.0.0.1',
    port: '4443',
    endpoints: {
      allIngredients: '/api/ingredient',
      randomIngredient: '/api/ingredient/random',
      oneIngredient: '/api/ingredient/:id'
    }
  }
};
