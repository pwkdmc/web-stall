import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export interface ICard {
    price: string;
    title: string;
}

export abstract class Card<T extends ICard> extends Component<T> {
    protected priceElement: HTMLElement;
    protected titleElement: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);

        this.priceElement = ensureElement<HTMLElement>('.card__price', this.container);
        this.titleElement = ensureElement<HTMLElement>('.card__title', this.container);
    }

    protected set title(value: string) {
        this.titleElement.textContent = value;
    }

    protected set price(value: string) {
        this.priceElement.textContent = value;
    }
}