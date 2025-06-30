export interface Request {
    getFrameState: {
        name: string;
    };
}

export interface Response {
    frameState: {
        name: string;
        value: unknown;
    };
}

export type SubscriberCallback = (value: unknown) => void;
