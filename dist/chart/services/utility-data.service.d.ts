import { ChartDataProvider, ServiceData } from '../../providers/chart-data-provider';
import { Observable } from 'rxjs';
export interface UtilityDataService {
    readonly subscribeServiceData: (symbol: string) => Observable<ServiceData>;
}
export declare const createUtilityDataService: import("../../context/context2").Context<Record<"chartDataProvider", ChartDataProvider>, UtilityDataService>;
