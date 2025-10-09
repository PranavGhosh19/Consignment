import { EventEmitter } from 'events';
import { type FirestorePermissionError } from './errors';

type Events = {
  'permission-error': (error: FirestorePermissionError) => void;
};

// Node's EventEmitter is used for simplicity.
// A more robust solution might use a library like `mitt`.
export const errorEmitter = new EventEmitter() as {
  on<T extends keyof Events>(event: T, listener: Events[T]): void;
  off<T extends keyof Events>(event: T, listener: Events[T]): void;
  emit<T extends keyof Events>(event: T, ...args: Parameters<Events[T]>): void;
};
