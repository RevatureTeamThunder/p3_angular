export class Product {
    productId: number;
    name: string;
    quantity: number;
    price: number;
    description: string;
    image: string;
  

    constructor (productId: number, name: string, quantity: number, description: string, price: number, image: string) {
        this.productId = productId;
        this.name = name;
        this.quantity = quantity;
        this.description = description;
        this.price = price;
        this.image = image;
    }
}
