import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export interface IForm {
    errors: string | null;
    valid: boolean;
}

export abstract class Form<T extends IForm> extends Component<T> {
    protected errorsElement: HTMLElement;
    protected submitButton: HTMLButtonElement;
    protected events: IEvents;

    constructor(events: IEvents, container: HTMLElement) {
        super(container);
        this.events = events;

        this.errorsElement = ensureElement<HTMLElement>('.form__errors', this.container);
        this.submitButton = ensureElement<HTMLButtonElement>('.button[type="submit"]', this.container);

        this.container.addEventListener('submit', (event) => {
            event.preventDefault();
            this.events.emit(`${this.container.getAttribute('name')}:submitted`);
        });
    }

    protected set errors(value: string | null) {
        this.errorsElement.textContent = value;
    }

    protected set valid(value: boolean) {
        this.submitButton.disabled = !value;
    }
}