import { todoStore } from "../../store/todo-store.ts";
import { Component } from "../component.ts";

export class ErrorComponent extends Component {
  constructor() {
    super(
      `
      <div class="error invisible">
        <span class="error__message"></span>
      </div>
    `
    );

    todoStore.error.subscribe(() => {
      this.render();
    });

    this.render();
  }

  protected render(): void {
    const messageElement: HTMLSpanElement = this.element.querySelector(
      ".error__message"
    ) as HTMLSpanElement;

    const error = todoStore.error.value;

    if (error != null) {
      messageElement.textContent = error.message;

      this.element.classList.add("visible");
      this.element.classList.remove("invisible");
    } else {
      this.element.classList.add("invisible");
      this.element.classList.remove("visible");
    }
  }
}
