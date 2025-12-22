import { todoStore } from "../../store/todo-store.ts";
import { ComponentWithChildren } from "../component.ts";
import { TodoComponent } from "./todo.ts";

export class TodosComponent extends ComponentWithChildren {
  private renderer: typeof TodoComponent;

  constructor(renderer: typeof TodoComponent) {
    super(`
      <ul class="todo__list" id="todos"></ul>
    `);

    this.renderer = renderer;

    todoStore.state.subscribe(() => {
      this.render();
    });

    todoStore.fetch();
    this.render();
  }

  protected render(): void {
    const list = todoStore.state.value;
    const elements = list.map((todo) => new this.renderer({ todo }).element);

    this.update(elements);
  }
}
