import { fetchTodosQuery } from "../../lib/query/todos.ts";
import { ComponentWithChildren } from "../component.ts";
import { TodoComponent } from "./todo.ts";

export class TodosComponent extends ComponentWithChildren {
  private renderer: typeof TodoComponent;

  constructor(renderer: typeof TodoComponent) {
    super(`
      <ul class="todo__list" id="todos"></ul>
    `);

    this.renderer = renderer;

    const { data, execute } = fetchTodosQuery;

    data.subscribe(() => {
      this.render();
    });

    this.render();

    execute();
  }

  protected render(): void {
    const list = fetchTodosQuery.data.value ?? [];

    const elements = list.map((todo) => new this.renderer({ todo }).element);

    this.update(elements);
  }
}
