import { ErrorComponent } from "../component/error/error.ts";
import { InputComponent } from "../component/input/input.ts";
import { SkeletonComponent } from "../component/loading/skeleton.ts";
import { TodoComponent } from "../component/todo/todo.ts";
import { TodosComponent } from "../component/todo/todos.ts";
import { todos } from "../service/todos/index.ts";

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
      onSubmit: todos.add,
    });

    const list = new TodosComponent(TodoComponent);
    const skeleton = new SkeletonComponent();
    const error = new ErrorComponent();

    input.attachTo(todoRoot);
    skeleton.attachTo(todoRoot);
    list.attachTo(todoRoot);
    error.attachTo(root);
  }
}

export const app = new App();
