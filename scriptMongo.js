//create the madMen database and connect to it
var db = connect('127.0.0.1:27017/restaurant'),
    allRestaurant = null;

//create dishes and orders collections
db.createCollection('dishes');
db.createCollection('orders');
//create the ingredients collection and add documents to it
db.ingredients.insert([
{
  "name": "johnny",
  "quantity": 0,
  "photo": "assets/images/ingredients/johnny.jpg"
},
{
  "name": "pomme",
  "quantity": 0,
  "photo": "assets/images/ingredients/apple-1.png"
},
{
  "name": "asperge",
  "quantity": 0,
  "photo": "assets/images/ingredients/asparagus.png"
},
{
  "name": "aubergine",
  "quantity": 0,
  "photo": "assets/images/ingredients/aubergine.png"
},
{
  "name": "avocat",
  "quantity": 0,
  "photo": "assets/images/ingredients/avocado.png"
},
{
  "name": "lard",
  "quantity": 0,
  "photo": "assets/images/ingredients/bacon.png"
},
{
  "name": "pain",
  "quantity": 0,
  "photo": "assets/images/ingredients/baguette.png"
},
{
  "name": "banane",
  "quantity": 0,
  "photo": "assets/images/ingredients/banana.png"
},
{
  "name": "haricot",
  "quantity": 0,
  "photo": "assets/images/ingredients/beans.png"
},
{
  "name": "myrtille",
  "quantity": 0,
  "photo": "assets/images/ingredients/blueberries.png"
},
{
  "name": "broccoli",
  "quantity": 0,
  "photo": "assets/images/ingredients/broccoli.png"
},
{
  "name": "chou",
  "quantity": 0,
  "photo": "assets/images/ingredients/cabbage.png"
},
{
  "name": "carotte",
  "quantity": 0,
  "photo": "assets/images/ingredients/carrot.png"
},
{
  "name": "chou-fleur",
  "quantity": 0,
  "photo": "assets/images/ingredients/cauliflower.png"
},
{
  "name": "fromage",
  "quantity": 0,
  "photo": "assets/images/ingredients/cheese.png"
},
{
  "name": "cerise",
  "quantity": 0,
  "photo": "assets/images/ingredients/cherries.png"
},
{
  "name": "piment",
  "quantity": 0,
  "photo": "assets/images/ingredients/chili.png"
},
{
  "name": "poireau",
  "quantity": 0,
  "photo": "assets/images/ingredients/chives.png"
},
{
  "name": "café",
  "quantity": 0,
  "photo": "assets/images/ingredients/coffee.png"
},
{
  "name": "concombre",
  "quantity": 0,
  "photo": "assets/images/ingredients/cucumber.png"
},
{
  "name": "mais",
  "quantity": 0,
  "photo": "assets/images/ingredients/corn.png"
},
{
  "name": "oeuf",
  "quantity": 0,
  "photo": "assets/images/ingredients/egg.png"
},
{
  "name": "figue",
  "quantity": 0,
  "photo": "assets/images/ingredients/fig.png"
},
{
  "name": "poisson",
  "quantity": 0,
  "photo": "assets/images/ingredients/fish.png"
},
{
  "name": "frite",
  "quantity": 0,
  "photo": "assets/images/ingredients/fries.png"
},
{
  "name": "ail",
  "quantity": 0,
  "photo": "assets/images/ingredients/garlic.png"
},
{
  "name": "milkshake",
  "quantity": 0,
  "photo": "assets/images/ingredients/frappe.png"
},
{
  "name": "raisin",
  "quantity": 0,
  "photo": "assets/images/ingredients/grapes.png"
},
{
  "name": "jambon",
  "quantity": 0,
  "photo": "assets/images/ingredients/ham.png"
},
{
  "name": "hamburger",
  "quantity": 0,
  "photo": "assets/images/ingredients/hamburguer.png"
},
{
  "name": "noisette",
  "quantity": 0,
  "photo": "assets/images/ingredients/hazelnut.png"
},
{
  "name": "miel",
  "quantity": 0,
  "photo": "assets/images/ingredients/honey.png"
},
{
  "name": "hot-dog",
  "quantity": 0,
  "photo": "assets/images/ingredients/hot-dog.png"
},
{
  "name": "glace",
  "quantity": 0,
  "photo": "assets/images/ingredients/ice-cream.png"
},
{
  "name": "citron",
  "quantity": 0,
  "photo": "assets/images/ingredients/lemon.png"
},
{
  "name": "olive",
  "quantity": 0,
  "photo": "assets/images/ingredients/olives.png"
},
{
  "name": "oignon",
  "quantity": 0,
  "photo": "assets/images/ingredients/onion.png"
},
{
  "name": "orange",
  "quantity": 0,
  "photo": "assets/images/ingredients/orange.png"
},
{
  "name": "pêche",
  "quantity": 0,
  "photo": "assets/images/ingredients/peach.png"
},
{
  "name": "poire",
  "quantity": 0,
  "photo": "assets/images/ingredients/pear.png"
},
{
  "name": "petit pois",
  "quantity": 0,
  "photo": "assets/images/ingredients/peas.png"
},
{
  "name": "cornichon",
  "quantity": 0,
  "photo": "assets/images/ingredients/pickles.png"
},
{
  "name": "pineapple",
  "quantity": 0,
  "photo": "assets/images/ingredients/pineapple.png"
},
{
  "name": "citrouille",
  "quantity": 0,
  "photo": "assets/images/ingredients/pumpkin.png"
},
{
  "name": "radis",
  "quantity": 0,
  "photo": "assets/images/ingredients/radish.png"
},
{
  "name": "framboise",
  "quantity": 0,
  "photo": "assets/images/ingredients/raspberry.png"
},
{
  "name": "salade",
  "quantity": 0,
  "photo": "assets/images/ingredients/salad-1.png"
},
{
  "name": "saumon",
  "quantity": 0,
  "photo": "assets/images/ingredients/salmon.png"
},
{
  "name": "saucisse",
  "quantity": 0,
  "photo": "assets/images/ingredients/sausage.png"
},
{
  "name": "riz",
  "quantity": 0,
  "photo": "assets/images/ingredients/rice.png"
},
{
  "name": "crevette",
  "quantity": 0,
  "photo": "assets/images/ingredients/shrimp.png"
},
{
  "name": "steak",
  "quantity": 0,
  "photo": "assets/images/ingredients/steak.png"
},
{
  "name": "fraise",
  "quantity": 0,
  "photo": "assets/images/ingredients/strawberry.png"
},
{
  "name": "tomate",
  "quantity": 0,
  "photo": "assets/images/ingredients/tomato.png"
},
{
  "name": "poulet",
  "quantity": 0,
  "photo": "assets/images/ingredients/turkey.png"
},
{
  "name": "pastèque",
  "quantity": 0,
  "photo": "assets/images/ingredients/watermelon.png"
},
{
  "name": "moutarde",
  "quantity": 0,
  "photo": "assets/images/ingredients/mustard.png"
},
{
  "name": "champignon",
  "quantity": 0,
  "photo": "assets/images/ingredients/mushrooms.png"
},
{
  "name": "lait",
  "quantity": 0,
  "photo": "assets/images/ingredients/milk.png"
},
{
  "name": "pâtes",
  "quantity": 0,
  "photo": "assets/images/ingredients/pasta.png"
},
{
  "name": "bière",
  "quantity": 0,
  "photo": "assets/images/ingredients/pint.png"
},
{
  "name": "pomme de terre",
  "quantity": 0,
  "photo": "assets/images/ingredients/potatoes-2.png"
},
{
  "name": "vin",
  "quantity": 0,
  "photo": "assets/images/ingredients/glass-4.png"
},
{
  "name": "cocktail",
  "quantity": 0,
  "photo": "assets/images/ingredients/glass-3.png"
},
{
  "name": "champagne",
  "quantity": 0,
  "photo": "assets/images/ingredients/glass-2.png"
},
{
  "name": "eau",
  "quantity": 0,
  "photo": "assets/images/ingredients/glass-4.png"
}
]);
