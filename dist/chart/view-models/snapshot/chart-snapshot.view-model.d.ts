import { Localization } from '../../../config/localization/localization';
import { NotificationViewModel } from '../notification.view-model';
import { ChartSharingProvider, UploadOptions } from '../../../providers/chart-sharing-provider';
import { ChartLegendViewModel } from '../chart-legend/chart-legend.view-model';
import { RefObject } from 'react';
import { ChartWithModules } from '../../components/canvas-chart-renderer/chart-with-modules';
import { AggregationPeriodViewModel } from '../aggregation-period.view-model';
import { MultiChartViewModel } from '../multi-chart.view-model';
export interface ChartSnapshotViewModel {
    readonly downloadSnapshot: () => Promise<void>;
    /**
     * Copies snapshot to the browser's clipboard, if clipboard isn't available opens image in the new tab
     */
    readonly copySnapshot: () => Promise<void>;
    /**
     * Copies link to the snapshot to the browser's clipboard, if clipboard isn't available opens image in the new tab
     */
    readonly copySnapshotLink: () => Promise<void>;
    /**
     * Shares chart snapshot to external resource (For example, twitter, telegram, facebook, ...)
     * Resulting promise returns url which can be used to create a link for specific external resource.
     */
    readonly shareToExternalResource: (options?: UploadOptions) => Promise<string>;
}
/**
 * @doc-tags snapshot
 */
export declare const createChartSnapshotViewModel: import("../../../context/context2").Context<Record<"localization", Localization> & Record<"charts", ChartWithModules[]> & Record<"chartLegendVMs", ChartLegendViewModel[]> & Record<"periodVMs", AggregationPeriodViewModel[]> & Record<"notificationVM", NotificationViewModel> & Record<"chartSharingProvider", ChartSharingProvider> & Omit<Record<"chart", ChartWithModules> & Record<"chartLegendVM", ChartLegendViewModel> & Record<"localization", Localization> & Record<"palette", import("../../../config/theme/chart-palette").ChartAppPalette> & Record<"themeViewModel", import("../theme.view-model").ThemeViewModel> & Record<"aggregationPeriodViewModel", AggregationPeriodViewModel>, "chart" | "aggregationPeriodViewModel" | "chartLegendVM"> & Record<"snapshotCanvasRef", RefObject<HTMLCanvasElement>> & Record<"multiChartViewModel", MultiChartViewModel>, import("../../../utils/adt/sink.utils").Sink1<"Observable", ChartSnapshotViewModel>>;
export declare const openLinkInNewTab: (link: string) => void | undefined;
