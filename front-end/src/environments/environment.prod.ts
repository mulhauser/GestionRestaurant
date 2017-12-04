export const environment = {
  production: true,
  backend: {
    protocol: 'http',
    host: '127.0.0.1',
    port: '4443',
    endpoints: {
      allIngredients: '/api/ingredient',
      oneIngredient: '/api/ingredient/:id',
      allPlats: '/api/dish',
      onePlat: '/api/dish/:id'
    }
  }
};
