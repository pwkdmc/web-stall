import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IHeader {
    counter: number;
}

export class Header extends Component<IHeader> {
    private basketButton: HTMLButtonElement;
    private counterElement: HTMLElement;
    private events: IEvents;

    constructor(events: IEvents, container: HTMLElement) {
        super(container);
        this.events = events;

        this.basketButton = ensureElement<HTMLButtonElement>('.header__basket', this.container);
        this.counterElement = ensureElement<HTMLElement>('.header__basket-counter', this.container);

        this.basketButton.addEventListener('click', () => {
            this.events.emit('basket:opened');
        });
    }

    protected set counter(value: number) {
        this.counterElement.textContent = String(value);
    }
}