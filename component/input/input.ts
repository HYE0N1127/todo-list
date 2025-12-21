import { Input } from "../../lib/todo/input/index.ts";
import { Component } from "../component.ts";

export class InputComponent extends Component {
  constructor() {
    super(`
      <div class="todo__input-group">
        <input
          type="text"
          id="todo__input"
          class="todo__input"
          placeholder="할 일을 입력해주세요"
        />
        <button class="button todos__add-button" data-size="lg">추가</button>
      </div>
    `);

    this.rendering();
  }

  private rendering() {
    const inputElement: HTMLInputElement = this.element.querySelector(
      "#todo__input"
    ) as HTMLInputElement;

    const buttonElement: HTMLButtonElement = this.element.querySelector(
      ".todos__add-button"
    ) as HTMLButtonElement;

    const input: Input = new Input(inputElement);

    buttonElement.onclick = () => {
      input.add();
    };
  }
}
