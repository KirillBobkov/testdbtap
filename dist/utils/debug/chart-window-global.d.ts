/**
 * Exposes important chart objects to global scope.
 * Only for development mode.
 * @doc-tags debug
 */
export declare const windowGlobal: {
    multiChartVM: (obj: any) => void;
    chartVMS: (chartId: string, obj: any) => void;
    actionsHistoryVM: (obj: any) => void;
    chartReactAPI: (obj: any) => void;
    chart: (chartId: string, obj: any) => void;
    callTracer: (obj: any) => void;
    quotesGenerator: (obj: any) => void;
};
