import { DrawingModel } from '@dx-private/dxchart5-modules/dist/drawings/model/drawing.model';
import { eq } from 'fp-ts';
import { Observable } from 'rxjs';
import { Localization } from '../../../config/localization/localization';
import { Property } from '../../../utils/property.utils';
import { Sink } from '../../../utils/sink';
import { ChartWithModules } from '../../components/canvas-chart-renderer/chart-with-modules';
import { LayerItem, LayerItemsGroup } from '../../model/chart-layers.model';
import { DrawingType } from '../../model/drawing.model';
import { InstrumentSymbol } from '../../model/layout.model';
import { UnsubscribeCallback } from '../api/chart-react-api.view-model';
import { ChartDataViewModel } from '../data/chart-data.view-model';
import { ChartDrawingViewModel } from '../drawings/drawing.view-model';
import { MultiChartViewModel } from '../multi-chart.view-model';
export interface ChartLayersViewModel {
    /**
     * Sets new layer items.
     * @param items
     */
    setAllLayerItems: (allItems: Record<InstrumentSymbol, LayerItem[]>) => void;
    /**
     * Layer items for the selected instrument
     */
    layerItems: Property<LayerItem[]>;
    addedLayerItem: Observable<LayerItem>;
    createGroup: (def?: Partial<Omit<LayerItemsGroup, 'type' | 'groupId'>>) => string;
    renameItem: (id: string, name: string) => void;
    deleteItem: (id: string) => void;
    /**
     * Move an item in the current layer tree
     * @param position - an index in the layerItems array.
     * @param groupId - If groupId is specified, then position is relative in the group
     **/
    moveItem: (item: LayerItem, position: number, toGroupId?: string) => void;
    /**
     * Creates new layer group based on selected groups or items
     * @param items - array containing uniq ids of selected items
     * @return created group ID
     **/
    createGroupOnSelectedItems: (items: string[]) => string | void;
    /**
     * Move an item in the current layer tree after drag and drop of object tree
     * @param fromIdx - the index of the element at the start of the drag.
     * @param toIdx - the index of the element at the end of the drag.
     **/
    moveItemDnD: (fromIdx: number, toIdx: number) => void;
    /**
     * Locks/unlocks the item with the specified id, if it's drawing - lock/unlock the single drawing,
     * if drawing group - lock/unlock every drawing in the group
     **/
    setItemLock: (id: string, lock: boolean) => void;
    /**
     * Changes visibility for the item with the specified id, if it's drawing - change visibility for the single drawing,
     * if drawing group - change visibility for every drawing in the group
     **/
    setItemVisible: (id: string, visible: boolean) => void;
    onLayerItemsChanged: (callback: (chartId: string, layerItems: Record<InstrumentSymbol, LayerItem[]>) => void) => UnsubscribeCallback;
}
export declare const createChartLayersViewModel: import("../../../context/context2").Context<Record<"chartId", string> & Record<"drawingViewModel", ChartDrawingViewModel> & Record<"chart", ChartWithModules> & Record<"chartDataViewModel", ChartDataViewModel> & Record<"initialLayerItems", Record<string, LayerItem[]>> & Record<"multiChartViewModel", MultiChartViewModel> & Record<"localization", Localization>, Sink<ChartLayersViewModel>>;
export declare const drawingsEq: eq.Eq<{
    readonly id: string;
    readonly visible: boolean;
    readonly locked: boolean;
}[]>;
export declare const getDrawingChartCoreId: (layerDrawingId: string) => string;
export declare const getDrawingLayerItemId: (drawing: DrawingModel<DrawingType>) => string;
