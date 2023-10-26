import { NotificationViewModel } from '../notification.view-model';
import { ChartDrawingViewModel } from '../drawings/drawing.view-model';
import { MultiChartViewModel } from '../multi-chart.view-model';
export declare const notifyDrawingsLimitIsReachedEffect: import("../../../context/context2").Context<Record<"notificationVM", NotificationViewModel> & Record<"drawingViewModel", ChartDrawingViewModel> & Record<"multiChartViewModel", MultiChartViewModel>, import("rxjs").Observable<boolean>>;
