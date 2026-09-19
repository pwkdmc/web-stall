import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface IModal {
    content: HTMLElement;
}

export class Modal extends Component<IModal> {
    private closeButton: HTMLButtonElement;
    private contentContainer: HTMLElement;
    private windowElement: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);

        this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);
        this.contentContainer = ensureElement<HTMLElement>('.modal__content', this.container);
        this.windowElement = ensureElement<HTMLElement>('.modal__container', this.container);

        this.closeButton.addEventListener('click', this.close.bind(this));
        this.container.addEventListener('click', this.close.bind(this));
        this.windowElement.addEventListener('click', (event) => event.stopPropagation());
    }

    protected set content(value: HTMLElement) {
        this.contentContainer.replaceChildren(value);
    }

    open(): void {
        this.container.classList.add('modal_active');
    }

    close(): void {
        this.container.classList.remove('modal_active');
        this.contentContainer.replaceChildren();
    }

    render(data: IModal): HTMLElement {
        super.render(data);
        this.open();
        return this.container;
    }
}