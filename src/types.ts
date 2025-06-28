export interface ResponseData {
    frameState: {
        name: string;
        value: any;
    };
}

export interface RequestData {
    getFrameState: {
        name: string;
    };
}

export type SubscriberCallback = (value: any) => void;
