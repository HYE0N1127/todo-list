import { todoStore } from "../../../store/todo-store.ts";

export class Input {
  private element: HTMLInputElement;

  constructor(element: HTMLInputElement) {
    this.element = element;
  }

  add() {
    const value: string = this.element.value;

    if (!value) {
      alert("내용을 입력해주세요");
      return;
    }

    todoStore.add({
      id: todoStore.getId(),
      content: value,
      isDone: false,
    });

    this.element.value = "";
  }
}
