import { Storage } from "../lib/storage/storage.ts";
import { Todo } from "../type/todo.ts";

const TODO_KEY = "todo-storage-key";

export class TodoRepository {
  private storage: Storage<Todo[]>;

  constructor(storage: Storage<Todo[]>) {
    this.storage = storage;
  }

  update(value: Todo[]): void {
    this.storage.set(TODO_KEY, value);
  }

  remove(): void {
    this.storage.remove(TODO_KEY);
  }

  get(): Todo[] {
    return this.storage.get(TODO_KEY) ?? [];
  }
}
