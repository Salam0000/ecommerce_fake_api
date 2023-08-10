export class Cart {

    id!: number;
    products!: {
        productId: number,
        quantity: number
    };
    userId!: number;
    date!: Date;
    Cart(
        id: number,
        products: {
            productId: number,
            quantity: number
        },
        userId: number,
        date: Date) {
        this.id = id;
        this.userId = userId;
        this.products = products;
        this.date = date;
    }
}