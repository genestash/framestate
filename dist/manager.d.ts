import { EmitDirection, SubscriberCallback } from './types';
declare const states: Record<string, unknown>;
/**
 * @returns An unsubscribe function.
 */
declare function subscribe(name: string, callback: SubscriberCallback): VoidFunction;
declare function update(name: string, value: unknown, direction: EmitDirection): void;
export { states, subscribe, update };
