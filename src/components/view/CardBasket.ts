import { ensureElement } from "../../utils/utils";
import { Card, ICard } from "./Card";

interface ICardBasket extends ICard {
    index: number;
}

interface ICardBasketActions {
    onDelete: () => void;
}

export class CardBasket extends Card<ICardBasket> {
    private indexElement: HTMLElement;
    private deleteButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: ICardBasketActions) {
        super(container);

        this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);
        this.indexElement = ensureElement<HTMLElement>('.basket__item-index', this.container);

        if (actions?.onDelete) {
            this.deleteButton.addEventListener('click', actions.onDelete);
        }        
    }

    protected set index(value: number) {
        this.indexElement.textContent = String(value);
    }
}