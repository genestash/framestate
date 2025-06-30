import type { SubscriberCallback } from './types';
declare const states: Record<string, unknown>;
declare const subscribers: Record<string, Set<SubscriberCallback>>;
/**
 * @returns An unsubscribe function.
 */
declare function subscribe(name: string, callback: SubscriberCallback): VoidFunction;
export { states, subscribers, subscribe };
