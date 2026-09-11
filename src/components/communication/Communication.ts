import { IApi, IProductList, IOrder, IOrderData } from "../../types";

export class Communication {
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    async getProducts(): Promise<IProductList> {
        return this.api.get<IProductList>('/product/');
    }

    async postOrder(data: IOrderData): Promise<IOrder> {
        return this.api.post<IOrder>('/order/', data);
    }
}