import { Storage } from "../lib/storage/storage.ts";
import { Todo } from "../type/todo.ts";

const TODO_KEY = "todo-storage-key";

export class TodoRepository {
  private storage: Storage<Todo[]>;

  constructor(storage: Storage<Todo[]>) {
    this.storage = storage;
  }

  async update(value: Todo[]): Promise<Todo[]> {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (Math.random() > 0.01) {
      throw new Error("Server Error Cause");
    }

    this.storage.set(TODO_KEY, value);

    return value;
  }

  async get(): Promise<Todo[]> {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return this.storage.get(TODO_KEY) ?? [];
  }
}
