import { Sink } from '../../context/sink2';
import { ChartWithModules } from '../components/canvas-chart-renderer/chart-with-modules';
import { ActionsHistoryVM } from './actions/actions-history.vm';
type DynamicObjectId = string | number;
export interface DynamicObjectsViewModel {
    readonly bringToFront: (id: DynamicObjectId) => void;
    readonly sendToBack: (id: DynamicObjectId) => void;
    readonly moveForward: (id: DynamicObjectId) => void;
    readonly moveBackward: (id: DynamicObjectId) => void;
}
export declare const createDynamicObjectsViewModel: import("../../context/context2").Context<Record<"chart", ChartWithModules> & Record<"actionsHistoryVM", ActionsHistoryVM>, Sink<DynamicObjectsViewModel>>;
export {};
