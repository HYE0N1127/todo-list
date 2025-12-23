import { State } from "./../lib/state/state";
import { LocalStorage } from "../lib/storage/storage.ts";
import { TodoRepository } from "../repository/todo-repository.ts";
import { Todo } from "../type/todo.ts";
import { generateId } from "../util/generate-id.ts";

type Status = "idle" | "loading" | "success" | "error";

class TodoStore {
  private repository: TodoRepository;
  private _state: State<Todo[]>;
  private _error: State<Error | undefined>;
  private _status: State<Status>;

  constructor() {
    this.repository = new TodoRepository(new LocalStorage());
    this._state = new State([]);
    this._error = new State(undefined);
    this._status = new State("idle");
  }

  private async update(todos: Todo[]): Promise<void> {
    this.setStatus({ status: "idle" });

    const prev = this._state.value;

    this._state.value = todos;

    try {
      await this.repository.update(todos);
    } catch (error) {
      if (error instanceof Error) {
        this._state.value = prev;
        this.setStatus({ status: "error", error });
      }
    }
  }

  private setStatus = ({
    status,
    error = undefined,
  }: {
    status: Status;
    error?: Error | undefined;
  }) => {
    this._status.value = status;
    this._error.value = error;
  };

  get state(): State<Todo[]> {
    return this._state;
  }

  get error(): State<Error | undefined> {
    return this._error;
  }

  get status(): State<Status> {
    return this._status;
  }

  async fetch(): Promise<void> {
    this.setStatus({ status: "loading" });

    try {
      const prev = await this.repository.get();

      this._state.value = [...prev];

      this.setStatus({ status: "success" });
    } catch (error) {
      if (error instanceof Error) {
        this.setStatus({ status: "error", error });
      }
    }
  }

  add(value: string): void {
    const update: Todo = {
      id: generateId(),
      content: value,
      isDone: false,
    };
    const updated = [...this._state.value, update];

    this.update(updated);
  }

  remove(id: string): void {
    const value = this._state.value;
    const updated = value.filter((todo) => todo.id !== id);

    this.update(updated);
  }

  toggleDone(id: string): void {
    const updated = this._state.value.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone };
      }
      return todo;
    });

    this.update(updated);
  }
}

export const todoStore: TodoStore = new TodoStore();
