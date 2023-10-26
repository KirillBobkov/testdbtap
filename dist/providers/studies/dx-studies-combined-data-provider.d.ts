import { DxScriptProvider } from '../dx-script-provider';
import { DxScriptStudiesDataProvider } from './dx-script-studies-data-provider';
import { DxStudiesProvider } from './dx-studies-provider';
import { StudiesDataProvider } from './studies-data-provider';
export declare const createCombinedStudiesProvider: (dxScript: DxScriptStudiesDataProvider, dxStudy: StudiesDataProvider, dxStudiesProvider: DxStudiesProvider, dxScriptProvider: DxScriptProvider) => StudiesDataProvider;
