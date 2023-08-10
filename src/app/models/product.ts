export class Product {
    id!: number;
    // ? possible null or has a value,! allow to be undefinited
    description!: string;
    price!: number ;
    category!: string ;
    image!: string ;
    rating!: {
        count: number ;
        rate: number ;
    } ;
    title!: string ;
    date!: Date ;
}