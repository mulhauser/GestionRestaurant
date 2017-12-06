export const environment = {
  production: false,
  backend: {
    protocol: 'http',
    host: '127.0.0.1',
    port: '4443',
    endpoints: {
      allIngredients: '/api/ingredient',
      oneIngredient: '/api/ingredient/:id',
      oneIngredientByName: '/api/ingredient/name/:name',
      allPlats: '/api/dish',
      onePlat: '/api/dish/:id',
      onePlatByName: '/api/dish/name/:name',
      allOrders: '/api/order',
      oneOrder: '/api/order/:id'
    }
  }
};
