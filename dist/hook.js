import { useState, useEffect } from 'react';
import { states, subscribe, update } from './manager';
import { EmitDirection } from './types';
function useFrameState(name) {
    const [value, setValue] = useState(() => {
        return states.hasOwnProperty(name) ? states[name] : null;
    });
    const setFrameState = (value) => {
        setValue(value);
        update(name, value, EmitDirection.Both);
    };
    useEffect(() => {
        const unsubscribe = subscribe(name, (value) => {
            setValue(value);
        });
        return () => unsubscribe();
    }, [name]);
    return [value, setFrameState];
}
export { useFrameState };
