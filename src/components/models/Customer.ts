import { TPayment, ICustomer, ICustomerPartial, ICustomerErrors } from "../../types";
import { IEvents } from "../base/Events";

export class Customer {
    private payment: TPayment | null;
    private email: string | null;
    private phone: string | null;
    private address: string | null;
    private events: IEvents;

    constructor(events: IEvents) {
        this.events = events;

        this.payment = null;
        this.email = null;
        this.phone = null;
        this.address = null;
    }

    checkData(): ICustomerErrors {
        const result: ICustomerErrors = {};
        if (!this.payment) {
            result.payment = "Не выбран способ оплаты";
        }
        if (!this.address) {
            result.address = "Не введен адрес доставки";
        }
        if (!this.email) {
            result.email = "Не введен email";
        }
        if (!this.phone) {
            result.phone = "Не введен номер телефона";
        }
        return result;
    }

    getData(): ICustomer {
        const result: ICustomer = {
            payment: this.payment,
            email: this.email,
            phone:this.phone,
            address: this.address
        };
        return result;
    }

    clearData(): void {
        this.payment = null;
        this.email = null;
        this.phone = null;
        this.address = null;
        this.events.emit('customer:changed');
    }

    saveData(data: ICustomerPartial): void {
        if (data.payment !== undefined) {
            this.payment = data.payment;
        }
        if (data.email !== undefined) {
            this.email = data.email;
        }
        if (data.phone !== undefined) {
            this.phone = data.phone;
        }
        if (data.address !== undefined) {
            this.address = data.address;
        }
        this.events.emit('customer:changed');
    }
}