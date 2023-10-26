import { useCallback, useState } from 'react';
/**
 * TODO describe
 * @param initial
 * @doc-tags utility,hooks
 */
export const useToggle = (initial = false) => {
    const [value, setValue] = useState(initial);
    const toggle = useCallback(() => setValue(!value), [value]);
    return [value, toggle, setValue];
};
