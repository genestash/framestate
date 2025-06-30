export interface StatePayload {
    name: string;
    value: unknown;
    source: number;
    isFrameState: true;
}

export type SubscriberCallback = (value: unknown, id: number) => void;
