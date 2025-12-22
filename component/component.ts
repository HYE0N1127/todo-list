export abstract class Component<T> {
  public readonly element: HTMLElement;

  constructor(htmlString: string) {
    const template: HTMLTemplateElement = document.createElement("template");

    template.innerHTML = htmlString;

    if (!(template.content.firstElementChild instanceof HTMLElement)) {
      throw new Error("element is null");
    }

    this.element = template.content.firstElementChild;
  }

  attachTo(parent: HTMLElement, position: InsertPosition = "beforeend") {
    if (this.element) {
      parent.insertAdjacentElement(position, this.element);
    }
  }

  protected abstract rendering(data?: T): void;
}

export abstract class RepaintableComponent<T> extends Component<T> {
  constructor(htmlString: string) {
    super(htmlString);
  }

  update(next: HTMLElement[]) {
    const prev = new Map<string, HTMLElement>();

    Array.from(this.element.children).forEach((child) => {
      if (child instanceof HTMLElement && child.dataset.id) {
        prev.set(child.dataset.id, child);
      }
    });

    next.forEach((item, index) => {
      const id = item.dataset.id;
      if (!id) return;

      const exist = prev.get(id);
      const current = this.element.children[index];

      if (exist) {
        if (exist !== current || exist.outerHTML !== item.outerHTML) {
          this.element.insertBefore(item, current || null);
          exist.remove();
        }
        prev.delete(id);
      } else {
        this.element.insertBefore(item, current || null);
      }
    });

    prev.forEach((item) => item.remove());
  }

  protected abstract rendering(data: T): void;
}
