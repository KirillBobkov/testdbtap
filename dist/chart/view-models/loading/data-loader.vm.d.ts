import { Property } from '../../../utils/property.utils';
import { Sink } from '../../../utils/sink';
export interface DataLoaderVM {
    /**
     * If data is in loading state
     */
    isLoading: Property<boolean>;
    /**
     * Set the loading state.
     */
    setDataIsLoading: (state: boolean) => void;
}
/**
 * DataLoaderVM is responsible for enabling/disabling loading state (spinner or fading)
 * @doc-tags chart-react,loading,
 */
export declare const createDataLoaderVM: () => Sink<DataLoaderVM>;
