/**
 * Studies data provider for dxScript.
 */
export const createDxScriptStudiesDataProvider = (dxScriptRunner, chart) => {
    const calculateStudy = (script, config) => {
        const candles = config.calculateFutureData
            ? chart.chartModel.getCandlesWithFake()
            : chart.chartModel.getCandles();
        return dxScriptRunner
            .runScript(script, config.parameters, candles)
            .then(res => (isSuccessRun(res) ? res.ticks : []));
    };
    return { calculateStudy };
};
export const isSuccessRun = (result) => result.successful;
