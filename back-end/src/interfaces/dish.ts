export interface Dish {
    id?: string;
    name: string;
    price: number;
    ingredients: [
        {
            ref: string;
            name: string;
            quantityUse: number;
        }
        ];
}
