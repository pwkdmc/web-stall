import { categoryMap } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Card, ICard } from "./Card";

interface ICardCatalog extends ICard {
    category: string;
    image: string;
}

interface ICardCatalogActions {
    onClick: () => void;
}

export type TCategory = keyof typeof categoryMap;

export class CardCatalog extends Card<ICardCatalog> {
    private categoryElement: HTMLElement;
    private imageElement: HTMLImageElement;

    constructor(container: HTMLElement, actions?: ICardCatalogActions) {
        super(container);

        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);

        if (actions?.onClick) {
            this.container.addEventListener('click', actions.onClick);
        }
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
}