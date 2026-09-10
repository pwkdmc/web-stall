export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
};

export type TPayment = 'card' | 'cash';

export interface ICustomer {
  payment: TPayment | null;
  email: string | null;
  phone: string | null;
  address: string | null;
};

export interface ICustomerPartial extends Partial<ICustomer> {}

export interface ICustomerErrors {
  payment?: string;
  email?: string;
  phone?: string;
  address?: string; 
}

export interface IProductList {
  total: number;
  items: IProduct[];
}

export interface IOrder {
  id: string;
  total: number;
}

export interface IOrderData extends ICustomer {
  total: number;
  items: string[];
}