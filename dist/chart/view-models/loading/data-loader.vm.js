import { merge } from 'rxjs';
import { newSink } from '../../../context/sink2';
import { createPropertyAdapter } from '../../../utils/property.utils';
/**
 * DataLoaderVM is responsible for enabling/disabling loading state (spinner or fading)
 * @doc-tags chart-react,loading,
 */
export const createDataLoaderVM = () => {
    const [setDataIsLoading, isLoading] = createPropertyAdapter(false);
    const effects = merge();
    return newSink({
        setDataIsLoading,
        isLoading,
    }, effects);
};
