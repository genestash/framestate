/**
 * @param Up - Emit to the parent window
 * @param Down - Emit to the all iframes on the page
 */
export enum EmitDirection {
    Up,
    Down,
    Both
}

export interface StatePayload {
    name: string;
    value: unknown;
    direction: EmitDirection;
    isFrameState: true;
}

export type SubscriberCallback = (value: unknown) => void;
