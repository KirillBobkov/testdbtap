import { Property } from '../../utils/property.utils';
import { DxScriptProvider, TDxScript } from '../dx-script-provider';
export declare const DXSCRIPTS_KEY = "dxscripts";
interface LSDxScriptProvider extends DxScriptProvider {
    scriptList: Property<TDxScript[]>;
    setScriptList: (scripts: TDxScript[]) => void;
}
export declare const createLocalStorageDxScriptProvider: () => LSDxScriptProvider;
export {};
