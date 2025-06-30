import { useState, useRef, useEffect } from 'react';
import { isNonEmptyString } from './utils';
import { states, subscribe } from './container';
import { emitFrameState } from './emitter';

function useFrameState<T = unknown>(name: string): [T | null, (value: T) => void] {
    const [value, setValue] = useState<T | null>(() => {
        return states.hasOwnProperty(name) ? (states[name] as T) : null;
    });

    const sourceRef = useRef(Math.random());

    const setFrameState = (value: T) => {
        if (states[name] === value) return;
        states[name] = value;
        setValue(value);
        emitFrameState(name, value, sourceRef.current);
    };

    useEffect(() => {
        if (!isNonEmptyString(name)) return;

        const unsubscribe = subscribe(name, (value, source) => {
            if (sourceRef.current === source) return;
            setValue(value as T);
        });

        return () => unsubscribe();
    }, [name]);

    return [value, setFrameState];
}

export { useFrameState };
