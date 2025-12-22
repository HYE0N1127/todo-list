import { ErrorComponent } from "../component/error/error.ts";
import { InputComponent } from "../component/input/input.ts";
import { TodoComponent } from "../component/todo/todo.ts";
import { TodosComponent } from "../component/todo/todos.ts";
import { todoStore } from "../store/todo-store.ts";

class App {
  constructor() {
    this.render();
  }

  private render() {
    const root: HTMLElement = document.getElementById("root") as HTMLElement;
    const todoRoot: HTMLElement = document.getElementById(
      "todo-container"
    ) as HTMLElement;

    const input = new InputComponent({
      placeholder: "할 일을 입력해주세요",
      onSubmit: (value) => {
        todoStore.add(value);
      },
    });

    const todos = new TodosComponent(TodoComponent);

    const error = new ErrorComponent();

    input.attachTo(todoRoot);
    todos.attachTo(todoRoot);
    error.attachTo(root);
  }
}

export const app = new App();
