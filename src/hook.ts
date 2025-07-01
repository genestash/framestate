import { useState, useEffect } from 'react';
import { states, subscribe, update } from './manager';
import { EmitDirection } from './types';

function useFrameState<T = unknown>(name: string): [T | null, (value: T) => void] {
    const [value, setValue] = useState<T | null>(() => {
        return states.hasOwnProperty(name) ? (states[name] as T) : null;
    });

    const setFrameState = (value: T) => {
        setValue(value);
        update(name, value, EmitDirection.Both);
    };

    useEffect(() => {
        const unsubscribe = subscribe(name, (value) => {
            setValue(value as T);
        });

        return () => unsubscribe();
    }, [name]);

    return [value, setFrameState];
}

export { useFrameState };
