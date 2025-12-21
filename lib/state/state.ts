import { Observable } from "./observable.js";

export class State<T> extends Observable {
  private _value: T;

  constructor(initial: T) {
    super();
    this._value = initial;
  }

  get value(): T {
    return this._value;
  }

  set value(update: T) {
    this._value = update;
    this.notify();
  }
}
