import { useState } from 'react';
export const usePersistentValue = (fn) => {
    const [value] = useState(fn);
    return value;
};
