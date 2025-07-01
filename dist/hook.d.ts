declare function useFrameState<T = unknown>(name: string): [T | null, (value: T) => void];
export { useFrameState };
