import { fetchTodosQuery } from "../../lib/query/todos.ts";
import { todoStore } from "../../store/todo-store.ts";
import { Component } from "../component.ts";

export class SkeletonComponent extends Component {
  constructor() {
    super(`
      <div class="todo__skeleton">
        <div class="todo__skeleton-bar"></div>
        <div class="todo__skeleton-bar"></div>
      </div>
    `);

    fetchTodosQuery.status.subscribe(() => this.render());
  }

  protected render() {
    const status = fetchTodosQuery.status.value;

    switch (status) {
      case "loading": {
        this.element.classList.add("block");
        this.element.classList.remove("none");
        break;
      }
      default: {
        this.element.classList.add("none");
        this.element.classList.remove("block");
      }
    }
  }
}
