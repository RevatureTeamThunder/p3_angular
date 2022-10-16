export class Product {
    productId: number;
    name: string;
    quantity: number;
    price: number;
    description: string;
    image: string;
    rating: number;
    review_count: number;
    category_id: number;
  

    constructor (productId: number, name: string, quantity: number, description: string, price: number, image: string, rating: number, review_count: number, category_id: number) {
        this.productId = productId;
        this.name = name;
        this.quantity = quantity;
        this.description = description;
        this.price = price;
        this.image = image;
        this.rating = rating;
        this.review_count = review_count;
        this.category_id = category_id;
    }
}
