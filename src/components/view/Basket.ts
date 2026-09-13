import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IBasket {
    price: string;
    products: HTMLElement[];
    valid: boolean;
}

export class Basket extends Component<IBasket> {
    private priceElement: HTMLElement;
    private submitButton: HTMLButtonElement;
    private productsContainer: HTMLElement;
    private events: IEvents;

    constructor(events: IEvents, container: HTMLElement) {
        super(container);
        this.events = events;

        this.priceElement = ensureElement<HTMLElement>('.basket__price', this.container);
        this.submitButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);
        this.productsContainer = ensureElement<HTMLElement>('.basket__list', this.container);

        this.submitButton.addEventListener('click', () => {
            this.events.emit('basket:submitted');
        });
    }

    protected set products(value: HTMLElement[]) {
        this.productsContainer.replaceChildren(...value);
    }

    protected set price(value: string) {
        this.priceElement.textContent = value;
    }

    protected set valid(value: boolean) {
        this.submitButton.disabled = !value;
    }
}