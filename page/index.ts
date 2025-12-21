import { InputComponent } from "../component/input/input.ts";
import { TodoComponent } from "../component/todo/todo.ts";
import { TodosComponent } from "../component/todo/todos.ts";

class App {
  constructor() {
    this.rendering();
  }

  private rendering() {
    const todoRoot: HTMLElement = document.getElementById(
      "todo-container"
    ) as HTMLElement;

    const input = new InputComponent();
    const todos = new TodosComponent(TodoComponent);

    input.attachTo(todoRoot);
    todos.attachTo(todoRoot);
  }
}

export const app = new App();
