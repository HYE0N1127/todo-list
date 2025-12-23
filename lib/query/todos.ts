import { todoRepository } from "../../repository/todo-repository.ts";
import { Query } from "./index.ts";

export const fetchTodosQuery = new Query(todoRepository.get);

export const updateTodosQuery = new Query(todoRepository.update);
