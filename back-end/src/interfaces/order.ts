export interface Order {
    id?: string;
    idTable: string;
    isServed: boolean;
    isPayed: boolean;
    idDishes: string[];
    orderDate: Date;
    serveDate: Date;
}
