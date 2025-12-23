import { State } from "../state/state.ts";

type Status = "idle" | "loading" | "success" | "error";

export class Query<P extends any[], D> {
  private _data: State<D | undefined>;
  private _error: State<Error | undefined>;
  private _status: State<Status>;

  private readonly queryFn: (...args: P) => Promise<D>;

  constructor(queryFn: (...args: P) => Promise<D>) {
    this._data = new State(undefined);
    this._error = new State(undefined);
    this._status = new State("idle");

    this.queryFn = queryFn;
  }

  private setStatus = ({
    status,
    error,
  }: {
    status: Status;
    error?: Error | undefined;
  }): void => {
    this._status.value = status;
    this._error.value = error;
  };

  public get data(): State<D | undefined> {
    return this._data;
  }

  public get error(): State<Error | undefined> {
    return this._error;
  }

  public get status(): State<Status> {
    return this._status;
  }

  public setData = (value: D): void => {
    this._data.value = value;
  };

  public execute = async (...args: P): Promise<void> => {
    this.setStatus({ status: "loading" });

    try {
      const result = await this.queryFn(...args);
      this._data.value = result;
      this._error.value = undefined;

      this.setStatus({ status: "success" });
    } catch (error) {
      if (error instanceof Error) {
        this.setStatus({ status: "error", error });
      }
    }
  };
}
