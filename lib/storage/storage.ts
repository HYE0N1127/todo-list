export interface Storage<T> {
  get(key: string): T | null;
  set(key: string, value: T): void;
  remove(key: string): void;
}

export class LocalStorage<T> implements Storage<T> {
  set(key: string, value: T): void {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): T | null {
    try {
      const value = window.localStorage.getItem(key);
      if (value == null) {
        throw new Error("value is null");
      }

      return JSON.parse(value) as T;
    } catch (e) {
      if (e instanceof Error) {
        console.error(e);
      }

      return null;
    }
  }

  remove(key: string) {
    window.localStorage.removeItem(key);
  }
}
