export interface Request {
    getFrameState: {
        name: string;
    };
}

export interface Response {
    frameState: {
        name: string;
        value: any;
    };
}

export type SubscriberCallback = (value: any) => void;
