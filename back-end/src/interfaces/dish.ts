export interface Dish {
    id?: string;
    name: string;
    price: number;
    ingredients: [
        {
            refIngredient: string;
            quantityUse: number;
        }
        ];
}
