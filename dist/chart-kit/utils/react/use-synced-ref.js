import { useRef, useEffect } from 'react';
/**
 * Use when you have forwardRef and you need another copy of that ref.
 * @param ref - from forwardRef
 * @doc-tags hooks
 */
export function useSyncedRef(ref) {
    // create a new inner ref
    const innerRef = useRef(null);
    // keep both refs in sync
    useEffect(() => {
        if (!ref) {
            return;
        }
        // handle callback refs
        if (typeof ref === 'function') {
            ref(innerRef.current);
        }
        // handle object refs
        else {
            ref.current = innerRef.current;
        }
    });
    return innerRef;
}
