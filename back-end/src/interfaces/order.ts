export interface Order {
    id?: string;
    name: string;
    tableId: string;
    isServed: boolean;
    isPayed: boolean;
    dishes: [
        {
            ref: string;
            name: string;
        }
        ];
    orderDate: Date;
    serveDate: Date;
}
