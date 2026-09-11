import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Catalog {
    private products: IProduct[];
    private selectedProduct: IProduct | null;
    private events: IEvents;

    constructor(events: IEvents) {
        this.events = events;

        this.products = [];
        this.selectedProduct = null;
    }

    setProducts(products: IProduct[]): void {
        this.products = products;
        this.events.emit('catalog:changed');
    }

    getProducts(): IProduct[] {
        return this.products;
    }

    getProductById(id: string): IProduct | null {
        return this.products.find(product => product.id === id) || null;
    }

    setSelectedProduct(product: IProduct | null): void {
        this.selectedProduct = product;
        this.events.emit('selected-product:changed');
    }

    getSelectedProduct(): IProduct | null {
        return this.selectedProduct;
    }
}