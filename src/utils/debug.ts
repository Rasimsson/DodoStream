import { useMemo } from 'react';

export type DebugLogger = (...args: unknown[]) => void;

export const createDebugLogger = (scope: string): DebugLogger => {
    return (...args: unknown[]) => {
        if (!__DEV__) return;
        console.debug(`[${scope}]`, ...args);
    };
};

export const useDebugLogger = (scope: string): DebugLogger => {
    return useMemo(() => createDebugLogger(scope), [scope]);
};
