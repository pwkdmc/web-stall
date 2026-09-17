import { categoryMap } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Card, ICard } from "./Card";
import { TCategory } from "./CardCatalog";

interface ICardPreview extends ICard {
    category: string;
    image: string;
    possibilityOrder: { value: string, isDisabled: boolean };
    description: string;
}

export class CardPreview extends Card<ICardPreview> {
    private categoryElement: HTMLElement;
    private imageElement: HTMLImageElement;
    private orderButton: HTMLButtonElement;
    private descriptionElement: HTMLElement;
    private events: IEvents;

    constructor(events: IEvents, container: HTMLElement) {
        super(container);
        this.events = events;

        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.orderButton = ensureElement<HTMLButtonElement>('.card__button', this.container);
        this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container)

        this.orderButton.addEventListener('click', () => {
            this.events.emit('card:basket-interaction');
        });
    }

    protected set category(value: string) {
        this.categoryElement.textContent = value;

        for (const key in categoryMap) {
            this.categoryElement.classList.toggle(categoryMap[key as TCategory], value === key);
        }
    }

    protected set image(value: string) {
        this.imageElement.src = value;
    }

    protected set possibilityOrder(data: { value: string, isDisabled: boolean }) {
        this.orderButton.disabled = data.isDisabled;
        this.orderButton.textContent = data.value;
    }

    protected set description(value: string) {
        this.descriptionElement.textContent = value;
    }
}