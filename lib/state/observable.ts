export class Observable {
  private listeners: Set<() => void> = new Set();

  notify(): void {
    this.listeners.forEach((listener) => listener());
  }

  subscribe(listener: () => void): void {
    this.listeners.add(listener);
  }

  unsubscribe(listener: () => void): void {
    this.listeners.delete(listener);
  }
}
