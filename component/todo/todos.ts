import { State } from "./../../lib/state/state";
import { todoStore } from "../../store/todo-store.ts";
import { RepaintableComponent } from "../component.ts";
import { TodoComponent } from "./todo.ts";

export class TodosComponent extends RepaintableComponent {
  private renderer: typeof TodoComponent;

  constructor(renderer: typeof TodoComponent) {
    super(`
      <ul class="todo__list" id="todos"></ul>
    `);

    this.renderer = renderer;

    todoStore.state.subscribe(() => this.rendering());
    todoStore.fetch();

    this.rendering();
  }

  private rendering() {
    const list = todoStore.state.value;
    const elements = list.map((todo) => new this.renderer(todo).element);

    this.update(elements);
  }
}
