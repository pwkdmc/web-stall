import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class ShoppingCart {
    private products: IProduct[];
    private events: IEvents;

    constructor(events: IEvents) {
        this.events = events;

        this.products = [];
    }

    addProduct(product: IProduct): void {
        this.products.push(product);
        this.events.emit('shoppingCart:changed');
    }

    deleteProduct(id: string): void {
        this.products = this.products.filter(el => el.id !== id);
        this.events.emit('shoppingCart:changed');
    }

    getNumberOfProducts(): number {
        return this.products.length;
    }

    getProducts(): IProduct[] {
        return this.products;
    }

    getPrice(): number {
        return this.products.reduce((acc, product) => acc + (product.price || 0), 0);
    }

    isProductInCart(id: string): boolean {
        return this.products.some(product => product.id === id);
    }

    clear(): void {
        this.products = [];
        this.events.emit('shoppingCart:changed');
    }
}