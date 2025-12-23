import { fetchTodosQuery, updateTodosQuery } from "../../lib/query/todos.ts";
import { Todo } from "../../type/todo.ts";
import { generateId } from "../../util/generate-id.ts";

export class Todos {
  private getter: () => Todo[];
  private setter: (todos: Todo[]) => void;

  constructor(getter: () => Todo[], setter: (todos: Todo[]) => void) {
    this.getter = getter;
    this.setter = setter;
  }

  public add = (content: string): void => {
    const update: Todo = {
      id: generateId(),
      content,
      isDone: false,
    };

    const updated = [...this.getter(), update];

    this.setter(updated);
  };

  public remove = (id: string): void => {
    const updated = this.getter().filter((todo) => todo.id !== id);

    this.setter(updated);
  };

  public toggleDone = (id: string): void => {
    const updated = this.getter().map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone };
      }

      return todo;
    });

    this.setter(updated);
  };
}

export const todos = new Todos(
  () => fetchTodosQuery.data.value ?? [],
  (todos) => {
    const prev = fetchTodosQuery.data.value ?? [];
    fetchTodosQuery.setData(todos);

    updateTodosQuery.execute(todos);

    updateTodosQuery.error.subscribe(() => {
      if (updateTodosQuery.error !== undefined) {
        fetchTodosQuery.setData(prev);
      }
    });
  }
);
