import { Component } from "../component.ts";

type Props = {
  required?: boolean;
  placeholder: string;
  onSubmit?: (value: string) => void;
};

export class InputComponent extends Component<Props> {
  constructor(props: Props) {
    super(
      `
      <div class="todo__input-group">
        <input
          type="text"
          id="todo__input"
          class="todo__input"
        />
        <button class="button todos__add-button" data-size="lg">추가</button>
      </div>
    `,
      props
    );

    this.render();
  }

  protected render(): void {
    const { required = true, placeholder, onSubmit } = this.props;

    const inputElement: HTMLInputElement = this.element.querySelector(
      "#todo__input"
    ) as HTMLInputElement;

    const buttonElement: HTMLButtonElement = this.element.querySelector(
      ".todos__add-button"
    ) as HTMLButtonElement;

    inputElement.placeholder = placeholder;

    buttonElement.onclick = () => {
      if (required && inputElement.value === "") {
        alert("내용을 입력해주세요");
        return;
      }
      onSubmit?.(inputElement.value);

      inputElement.value = "";
    };
  }
}
