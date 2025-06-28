/**
 * @param initialValue - The value used until synchronization occurs.
 */
declare function useFrameState<T = unknown>(name: string, initialValue?: T): T;
export default useFrameState;
