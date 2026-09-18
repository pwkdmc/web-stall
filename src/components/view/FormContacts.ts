import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form, IForm } from "./Form";

interface IFormContacts extends IForm {
    email: string | null;
    phone: string | null;
}

export class FormContacts extends Form<IFormContacts> {
    protected emailInput: HTMLInputElement;
    protected phoneInput: HTMLInputElement;

    constructor(events: IEvents, container: HTMLElement) {
        super(events, container);

        this.emailInput = ensureElement<HTMLInputElement>('.form__input[name="email"]', this.container);
        this.phoneInput = ensureElement<HTMLInputElement>('.form__input[name="phone"]', this.container);

        this.phoneInput.addEventListener('input', () => {
            this.events.emit('contacts:phone-changed', { phone: this.phoneInput.value });
        });

        this.emailInput.addEventListener('input', () => {
            this.events.emit('contacts:email-changed', { email: this.emailInput.value });
        });
    }

    protected set email(value: string | null) {
        this.emailInput.value = value ?? '';
    }

    protected set phone(value: string | null) {
        this.phoneInput.value = value ?? '';
    }
}