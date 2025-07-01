/**
 * @param Up - Emit to the parent window
 * @param Down - Emit to the all iframes on the page
 */
export declare enum EmitDirection {
    Up = 0,
    Down = 1,
    Both = 2
}
export interface StatePayload {
    name: string;
    value: unknown;
    direction: EmitDirection;
    isFrameState: true;
}
export type SubscriberCallback = (value: unknown) => void;
