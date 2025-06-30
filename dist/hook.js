import { useState, useRef, useEffect } from 'react';
import { isNonEmptyString } from './utils';
import { states, subscribe } from './container';
import { emitFrameState } from './emitter';
function useFrameState(name) {
    const [value, setValue] = useState(() => {
        return states.hasOwnProperty(name) ? states[name] : null;
    });
    const sourceRef = useRef(Math.random());
    const setFrameState = (value) => {
        if (states[name] === value)
            return;
        states[name] = value;
        setValue(value);
        emitFrameState(name, value, sourceRef.current);
    };
    useEffect(() => {
        if (!isNonEmptyString(name))
            return;
        const unsubscribe = subscribe(name, (value, source) => {
            if (sourceRef.current === source)
                return;
            setValue(value);
        });
        return () => unsubscribe();
    }, [name]);
    return [value, setFrameState];
}
export { useFrameState };
