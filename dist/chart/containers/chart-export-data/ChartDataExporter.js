import { indicatorsFormatter } from '@dx-private/dxchart5-modules/dist/studies/model/formatters';
import { format } from 'date-fns';
/**
 * Chart Data Export Class.
 * Exports a CSV file with all important candles and studies information
 * such as candles timestamps, candles or studies values.
 *
 * @doc-tags chart-core,candles-export
 */
export class ChartDataExporter {
    constructor(chartModel, studiesModel, period) {
        this.chartModel = chartModel;
        this.studiesModel = studiesModel;
        this.period = period;
    }
    /**
     * Exports the data and downloads the file
     */
    exportChartData() {
        const data = this.getCSVData();
        const url = URL.createObjectURL(data);
        const filename = this.getFileName();
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    getFileName() {
        const filename = [];
        const candlesData = this.getChartCandles(this.chartModel);
        const studiesData = this.getChartStudies(this.studiesModel);
        const dateNow = new Date(Date.now());
        const day = dateNow.getDate() < 10 ? `0${dateNow.getDate()}` : `${dateNow.getDate()}`;
        const month = dateNow.getMonth() < 10 ? `0${dateNow.getMonth() + 1}` : `${dateNow.getMonth() + 1}`;
        const date = `${day}-${month}-${dateNow.getFullYear()}`;
        candlesData.map(candlesData => {
            filename.push(candlesData.instrument.symbol);
        });
        studiesData.forEach(study => {
            filename.push(study.studyConfig.title);
        });
        let fileNameString = filename.join('; ');
        fileNameString = `${fileNameString} - ${this.period} - ${date}.csv`;
        fileNameString.replace(/[/\\?%*:|"<>]/g, '_');
        return fileNameString;
    }
    getCSVData() {
        const candlesData = this.getChartCandles(this.chartModel);
        const studiesData = this.getChartStudies(this.studiesModel);
        const candlesHeaders = candlesData.map(candlesData => {
            const symbol = candlesData.instrument.symbol;
            return this.chartModel.config.components.volumes.visible
                ? `${symbol}:Timestamp,${symbol}:Open,${symbol}:High,${symbol}:Low,${symbol}:Close,${symbol}:Volume`.split(',')
                : `${symbol}:Timestamp,${symbol}:Open,${symbol}:High,${symbol}:Low,${symbol}:Close`.split(',');
        });
        let studiesHeaders = [];
        studiesData.forEach(study => {
            study.studyConfig.lines.forEach(line => {
                studiesHeaders = [...studiesHeaders, `${study.studyConfig.title}:${line.title}`];
            });
        });
        const longestCandlesSeries = Math.max(...candlesData.map(candlesSeries => candlesSeries.dataPoints.length));
        const studiesSeries = [];
        studiesData.forEach(series => {
            series.dataSeries.forEach(dataSeries => {
                studiesSeries.push(dataSeries.dataPoints);
            });
        });
        const longestStudiesSeries = Math.max(...studiesSeries.map(series => series.length));
        const candlesValues = [];
        for (let i = longestCandlesSeries - 1; i >= 0; i--) {
            const rowCandlesDataArray = [];
            candlesData.forEach(candlesSeries => {
                const candles = candlesSeries.dataPoints;
                rowCandlesDataArray.push(`${format(candles[i].timestamp, 'dd-MM-yyyy HH:mm:ss')}`, `${this.chartModel.pane.valueFormatter(candles[i].open)}`, `${this.chartModel.pane.valueFormatter(candles[i].hi)}`, `${this.chartModel.pane.valueFormatter(candles[i].lo)}`, `${this.chartModel.pane.valueFormatter(candles[i].close)}`);
                if (this.chartModel.config.components.volumes.visible) {
                    rowCandlesDataArray.push(`${candles[i].volume}`);
                }
            });
            candlesValues.push(rowCandlesDataArray);
        }
        const studiesValues = [];
        if (longestStudiesSeries > 0) {
            for (let i = 0; i < longestStudiesSeries; i++) {
                const rowStudiesDataArray = [];
                studiesSeries.forEach(series => {
                    // sometimes studies have different data points length available
                    const diff = longestStudiesSeries - series.length;
                    if (diff && i < diff) {
                        rowStudiesDataArray.push(``);
                        return;
                    }
                    series[i]
                        ? rowStudiesDataArray.push(`${indicatorsFormatter(series[i].close)}`)
                        : rowStudiesDataArray.push(`${indicatorsFormatter(series[i - diff - 1].close)}`);
                });
                studiesValues.push(rowStudiesDataArray);
            }
        }
        const headers = studiesHeaders.length > 0 ? candlesHeaders.concat(studiesHeaders) : candlesHeaders;
        const values = this.getValues(candlesValues, studiesValues.reverse());
        const dataString = [[headers], ...values.map(item => item)].map(e => e.join(',')).join('\n');
        return new Blob([dataString], { type: 'text/csv;charset=utf-8;' });
    }
    getChartCandles(chartModel) {
        const candles = [];
        chartModel.candleSeries.forEach(candleSeries => {
            candles.push(candleSeries);
        });
        candles.sort((a, b) => {
            if (a.instrument.symbol < b.instrument.symbol) {
                return -1;
            }
            if (a.instrument.symbol > b.instrument.symbol) {
                return 1;
            }
            return 0;
        });
        return candles;
    }
    getStudiesData(studiesSeries) {
        const studiesData = Object.entries(studiesSeries).map(([, series]) => series);
        studiesData.sort((a, b) => {
            if (a.studyConfig.title < b.studyConfig.title) {
                return -1;
            }
            if (a.studyConfig.title > b.studyConfig.title) {
                return 1;
            }
            return 0;
        });
        return studiesData;
    }
    getChartStudies(studiesModel) {
        const studiesOverlays = this.getStudiesData(studiesModel.overlays);
        const studiesUnderlays = this.getStudiesData(studiesModel.underlays);
        return studiesOverlays.concat(studiesUnderlays);
    }
    getValues(candleValues, studiesValues) {
        const values = [];
        if (studiesValues.length > 0) {
            for (let i = 0; i < studiesValues.length - 1; i++) {
                values.push(candleValues[i].concat(studiesValues[i]));
            }
        }
        else {
            candleValues.forEach(val => values.push(val));
        }
        return values;
    }
}
