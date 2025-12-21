import { State } from "./../lib/state/state";
import { LocalStorage } from "../lib/storage/storage.ts";
import { TodoRepository } from "../repository/todo-repository.ts";
import { Todo } from "../type/todo.ts";

class TodoStore {
  private repository: TodoRepository;
  private _state: State<Todo[]>;

  constructor() {
    this.repository = new TodoRepository(new LocalStorage());
    this._state = new State([]);
  }

  private update(updated: Todo[]): void {
    this._state.value = updated;
    this.repository.update(updated);
  }

  get state(): State<Todo[]> {
    return this._state;
  }

  fetch(): void {
    const prev = this.repository.get();
    this._state.value = [...prev];
  }

  add(value: Todo): void {
    const updated = [...this._state.value, value];
    this.update(updated);
  }

  remove(id: number): void {
    const value = this._state.value;
    const updated = value.filter((todo) => todo.id !== id);

    this.update(updated);
  }

  changeDone(id: number): void {
    const updated = this._state.value.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone };
      }
      return todo;
    });

    this.update(updated);
  }

  getId(): number {
    const length = this._state.value.length;
    if (length === 0) {
      return 1;
    }

    const lastItem: Todo = this._state.value[length - 1];

    return lastItem.id + 1;
  }
}

export const todoStore: TodoStore = new TodoStore();
