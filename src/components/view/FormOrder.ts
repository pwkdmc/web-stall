import { ensureAllElements, ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form, IForm } from "./Form";

interface IFormOrder extends IForm {
    address: string | null;
    payment: string | null;
}

export class FormOrder extends Form<IFormOrder> {
    protected paymentButtons: HTMLButtonElement[];
    protected addressInput: HTMLInputElement;

    constructor(events: IEvents, container: HTMLElement) {
        super(events, container);

        this.paymentButtons = ensureAllElements<HTMLButtonElement>('.button_alt', this.container);
        this.addressInput = ensureElement<HTMLInputElement>('.form__input[name="address"]', this.container);

        this.paymentButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.events.emit('order:payment-changed', { payment: button.name });
            });
        });

        this.addressInput.addEventListener('input', () => {
            this.events.emit('order:address-changed', { address: this.addressInput.value });
        });
    }

    protected set address(value: string | null) {
        this.addressInput.value = value ?? '';
    }

    protected set payment(value: string | null) {
        this.paymentButtons.forEach(button => {
            button.classList.toggle('button_alt-active', button.name === value);
        });
    }
}