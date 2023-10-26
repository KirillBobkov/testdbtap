import { useToggle } from './use-toggle.hook';
import debounce from '../../utils/function/debounce.util';
/**
 * TODO describe
 * @param initial
 * @param wait
 * @doc-tags utility,hooks
 */
export const useDebounceToggle = (initial = false, wait = 100) => {
    const [value, toggle] = useToggle(initial);
    const debouncedToggle = debounce(toggle, wait);
    return [value, debouncedToggle];
};
