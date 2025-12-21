import { todoStore } from "../../store/todo-store.ts";
import { Todo } from "../../type/todo.ts";
import { Component } from "../component.ts";

export class TodoComponent extends Component {
  constructor(todo: Todo) {
    super(`
      <li class="todo" data-id="1">
        <div class="todo__content">
          <input type="checkbox" class="todo__checkbox" />
          <span class="todo__text"></span>
        </div>
        <button
          class="button todo__delete-button"
          data-icon-only="true"
          data-size="sm"
        >
          X
        </button>
      </li>
    `);

    this.rendering(todo);
  }

  private rendering(todo: Todo) {
    this.element.setAttribute("data-id", todo.id.toString());

    const textElement: HTMLSpanElement = this.element.querySelector(
      ".todo__text"
    ) as HTMLSpanElement;
    const deleteButton: HTMLButtonElement = this.element.querySelector(
      ".todo__delete-button"
    ) as HTMLButtonElement;
    const checkbox: HTMLInputElement = this.element.querySelector(
      ".todo__checkbox"
    ) as HTMLInputElement;

    textElement.textContent = todo.content;
    checkbox.checked = todo.isDone;

    checkbox.onchange = (event: Event) => {
      const checked = (event.target as HTMLInputElement).checked;

      if (checked) {
        this.element.classList.add("done");
      } else {
        this.element.classList.remove("done");
      }

      todoStore.changeDone(todo.id);
    };

    if (todo.isDone) {
      this.element.classList.add("done");
    }

    deleteButton.onclick = () => {
      todoStore.remove(todo.id);
    };
  }
}
