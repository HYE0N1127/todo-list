import { State } from "./../lib/state/state";
import { LocalStorage } from "../lib/storage/storage.ts";
import { TodoRepository } from "../repository/todo-repository.ts";
import { Todo } from "../type/todo.ts";

class TodoStore {
  private repository: TodoRepository;
  private state: State<Todo[]>;

  constructor() {
    this.repository = new TodoRepository(new LocalStorage());
    this.state = new State([]);
  }

  private update(updated: Todo[]): void {
    this.state.value = updated;
    this.repository.update(updated);
  }

  add(value: Todo): void {
    const updated = [...this.state.value, value];
    this.update(updated);
  }

  remove(id: number): void {
    const value = this.state.value;
    const updated = value.filter((todo) => todo.id !== id);

    this.update(updated);
  }

  changeDone(id: number): void {
    const updated = this.state.value.map((todo) => {
      if (todo.id === id) {
        return { ...todo, done: !todo.isDone };
      }
      return todo;
    });

    this.update(updated);
  }
}

export const todoStore: TodoStore = new TodoStore();
