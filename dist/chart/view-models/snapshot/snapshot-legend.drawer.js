import { getTextWidth } from '@dx-private/dxchart5-modules/dist/drawings/common/text-drawing-functions';
import { CanvasElement, CHART_UUID } from '@devexperts/dxcharts-lite/dist/chart/canvas/canvas-bounds-container';
import { getColorByDirection } from '../../dom-mutation-models/chart-legend.dom-mutation-model';
import { option } from 'fp-ts';
import { context } from '../../../context/context2';
import { getTextLineHeight } from '@devexperts/dxcharts-lite/dist/chart/utils/canvas/canvas-text-functions.utils';
import { SeparateVolumesComponent } from '@devexperts/dxcharts-lite/dist/chart/components/volumes/separate-volumes.component';
import { periodToString } from '../../model/aggregation.model';
import { MAIN_FONT } from '@devexperts/dxcharts-lite/dist/chart/chart.config';
const PADDING = 4;
// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const FONT = `12px ${MAIN_FONT}`;
/**
 * @doc-tags snapshot
 * @arch-tangle-ignore
 */
export const drawLegendOnCanvas = context.combine(context.key()('chart'), context.key()('chartLegendVM'), context.key()('localization'), context.key()('palette'), context.key()('themeViewModel'), context.key()('aggregationPeriodViewModel'), (chart, chartLegendVM, l10n, palette, themeVM, periodVM) => (ctx) => {
    const currentPalette = palette[themeVM.activeTheme.getValue()].object;
    const localization = l10n.legend;
    ctx.font = FONT;
    const textLineHeight = getTextLineHeight(ctx);
    const lineDiff = getTextLineHeight(ctx) + PADDING * 2; // default distance between two line
    const { series } = chartLegendVM.state.getValue();
    const mainInstrumentDot = String.fromCharCode(183);
    const mainInstrumentSymbol = `${chart.chartModel.mainCandleSeries.instrument.symbol} ${mainInstrumentDot}`;
    const periodStr = `${mainInstrumentDot} ${periodToString(periodVM.selectedPeriod.getValue())}`;
    const longestWidth = getLongestWidth(series, FONT, localization, mainInstrumentSymbol, periodStr);
    const chartBounds = chart.bounds.getBounds(CanvasElement.PANE_UUID(CHART_UUID));
    ctx.fillStyle = currentPalette['databox-bg'];
    let y = chartBounds.y + PADDING * 4;
    const dataBoxHeight = Math.min(getDataboxHeight(chartLegendVM, lineDiff), chartBounds.height - PADDING * 4);
    const mainSeriesColor = getColorByDirection(chart.config.components.chart.type, chart.config.colors, series.mainSeries.direction);
    ctx.fillRect(chartBounds.x + PADDING, chartBounds.y + PADDING, longestWidth + PADDING * 2, dataBoxHeight);
    ctx.save();
    ctx.rect(chartBounds.x + PADDING, chartBounds.y + PADDING, longestWidth + PADDING * 2, dataBoxHeight - PADDING);
    ctx.clip();
    y = drawMainSeries(ctx, series, chartBounds, localization, mainSeriesColor, FONT, longestWidth, y, lineDiff, currentPalette, mainInstrumentSymbol, periodStr);
    if (chartLegendVM.showMainLegendVolumes.getValue()) {
        y = drawOverlayingVolumes(ctx, chartBounds, localization, FONT, series, mainSeriesColor, y, lineDiff, currentPalette);
    }
    y = drawOverlayingStudies(ctx, series, FONT, longestWidth, chartBounds, y, lineDiff, currentPalette);
    drawCompareSeries(ctx, series, localization, FONT, longestWidth, chartBounds, y, lineDiff, currentPalette);
    ctx.restore();
    if (chartLegendVM.showSeparateLegendVolumes.getValue()) {
        drawSeparateVolumes(ctx, chart, localization, FONT, series, mainSeriesColor, currentPalette, textLineHeight);
    }
    const panesBounds = chart.bounds.getBoundsPanes();
    series.separateStudiesSeries.forEach(series => drawSeparateStudySeries(ctx, series, FONT, panesBounds, currentPalette, textLineHeight));
});
const getDataboxHeight = (chartLegendVM, lineDiff) => {
    const { series } = chartLegendVM.state.getValue();
    let height = PADDING * 8; // padding inside box from top and bottom
    height += lineDiff * 2; // height of time line, O H line, C L line,
    if (chartLegendVM.showMainLegendVolumes.getValue()) {
        height += lineDiff; // height of volume line
    }
    series.stackedStudiesSeries.forEach(studies => {
        height += lineDiff + PADDING * 2; // Study name
        studies.lines.forEach(() => (height += lineDiff));
    });
    if (series.secondarySeries.length !== 0) {
        height += lineDiff + PADDING * 2; // Compare title
        series.secondarySeries.forEach(() => (height += lineDiff));
    }
    return height;
};
const getLongestWidth = (series, font, localization, mainInstrumentSymbol, periodStr) => {
    let maxWidth = 0;
    maxWidth = Math.max(getTextWidth(localization.open, font) +
        getTextWidth(localization.high, font) +
        getTextWidth(series.mainSeries.open, font) +
        getTextWidth(series.mainSeries.high, font) +
        PADDING * 3, maxWidth);
    maxWidth = Math.max(getTextWidth(localization.low, font) +
        getTextWidth(localization.close, font) +
        getTextWidth(series.mainSeries.low, font) +
        getTextWidth(series.mainSeries.close, font) +
        PADDING * 3, maxWidth);
    maxWidth = Math.max(getTextWidth(`${mainInstrumentSymbol} ${series.mainSeries.time} ${periodStr}`, font), maxWidth);
    series.stackedStudiesSeries.forEach(s => s.lines.forEach(l => (maxWidth = Math.max(getTextWidth(l.title, font) + getTextWidth(l.value, font) + PADDING * 5, maxWidth))));
    series.secondarySeries.forEach(s => (maxWidth = Math.max(getTextWidth(s.symbol, font) + getTextWidth(s.price, font) + PADDING * 5, maxWidth)));
    return maxWidth;
};
const drawMainSeries = (ctx, series, chartBounds, localization, mainSeriesColor, font, longestWidth, _y, lineDiff, currentPalette, mainInstrumentSymbol, periodStr) => {
    let x = chartBounds.x + PADDING * 2;
    let y = _y;
    // line time
    ctx.fillStyle = currentPalette['databox-text-default'];
    ctx.fillText(`${mainInstrumentSymbol} ${series.mainSeries.time} ${periodStr}`, chartBounds.x + PADDING * 2, y);
    const openWidth = getTextWidth(localization.open, font);
    const lowWidth = getTextWidth(localization.low, font);
    const firstColumnWidth = Math.max(openWidth, lowWidth);
    const openValueWidth = getTextWidth(series.mainSeries.open, font);
    const lowValueWidth = getTextWidth(series.mainSeries.low, font);
    const secondColumnWidth = Math.max(openValueWidth, lowValueWidth);
    const firstAndSecondWidth = firstColumnWidth + PADDING / 2 + secondColumnWidth;
    for (const [first, second] of [
        ['open', 'high'],
        ['low', 'close'],
    ]) {
        y += lineDiff;
        x = chartBounds.x + PADDING * 2;
        ctx.fillStyle = currentPalette['databox-text-default'];
        ctx.fillText(localization[first], x, y);
        ctx.fillStyle = mainSeriesColor;
        x += firstColumnWidth + PADDING / 2;
        ctx.fillText(series.mainSeries[first], x, y);
        ctx.fillStyle = currentPalette['databox-text-default'];
        x = chartBounds.x + PADDING * 2 + firstAndSecondWidth + PADDING * 2;
        ctx.fillText(localization[second], x, y);
        ctx.fillStyle = mainSeriesColor;
        x += getTextWidth(localization[second], font) + PADDING / 2;
        ctx.fillText(series.mainSeries[second], x, y);
    }
    return y;
};
const drawOverlayingVolumes = (ctx, chartBounds, localization, font, series, mainSeriesColor, _y, lineDiff, currentPalette) => {
    let x = chartBounds.x + PADDING * 2;
    const y = _y + lineDiff;
    ctx.fillStyle = currentPalette['databox-text-default'];
    ctx.fillText(localization.volume, x, y);
    ctx.fillStyle = mainSeriesColor;
    x += getTextWidth(localization.volume, font) + PADDING / 2;
    ctx.fillText(option.getOrElse(() => '')(series.mainSeries.volume), x, y);
    return y;
};
const drawOverlayingStudies = (ctx, series, font, longestWidth, chartBounds, _y, lineDiff, currentPalette) => {
    let y = _y;
    series.stackedStudiesSeries.forEach(series => {
        let x = chartBounds.x + PADDING * 2;
        y += lineDiff + PADDING * 2;
        ctx.fillStyle = currentPalette['databox-text-disabled'];
        ctx.fillText(series.title, x, y);
        series.lines.forEach(l => {
            x = chartBounds.x + PADDING * 2;
            y += lineDiff;
            ctx.fillStyle = currentPalette['databox-text-default'];
            ctx.fillText(l.title, x, y);
            x += longestWidth - getTextWidth(l.value, font);
            if (l.colors && l.colors[0]) {
                ctx.fillStyle = l.colors[0];
            }
            ctx.fillText(l.value, x, y);
        });
    });
    return y;
};
const drawCompareSeries = (ctx, series, localization, font, longestWidth, chartBounds, _y, lineDiff, currentPalette) => {
    let y = _y;
    if (series.secondarySeries.length !== 0) {
        let x = chartBounds.x + PADDING * 2;
        y += lineDiff + PADDING * 2;
        ctx.fillStyle = currentPalette['databox-text-disabled'];
        ctx.fillText(localization.compare, x, y);
        series.secondarySeries.forEach(series => {
            x = chartBounds.x + PADDING * 2;
            y += lineDiff;
            ctx.fillStyle = currentPalette['databox-text-default'];
            ctx.fillText(series.symbol, x, y);
            x += longestWidth - getTextWidth(series.price, font);
            ctx.fillStyle = series.color;
            ctx.fillText(series.price, x, y);
        });
    }
    return y;
};
const drawSeparateVolumes = (ctx, chart, localization, font, series, mainSeriesColor, currentPalette, height) => {
    const bounds = chart.bounds.getBounds(CanvasElement.PANE_UUID(SeparateVolumesComponent.UUID));
    const titleWidth = getTextWidth(localization.volume, font);
    const value = option.getOrElse(() => '')(series.volume);
    const backgroundWidth = titleWidth + getTextWidth(value, font) + PADDING * 3;
    ctx.fillStyle = currentPalette['databox-bg'];
    ctx.fillRect(bounds.x + PADDING, bounds.y, backgroundWidth, height);
    ctx.fillStyle = currentPalette['databox-text-default'];
    let x = bounds.x + PADDING * 2;
    ctx.fillText(localization.volume, x, bounds.y + PADDING * 4);
    x += titleWidth + PADDING;
    ctx.fillStyle = mainSeriesColor;
    ctx.fillText(value, x, bounds.y + PADDING * 4);
};
const drawSeparateStudySeries = (ctx, series, font, panesBounds, currentPalette, height) => {
    const bounds = panesBounds[series.uuid];
    const titleWidth = getTextWidth(series.title, font);
    let x = bounds.x + PADDING * 2;
    const bgWidth = titleWidth +
        PADDING * 2 +
        series.lines.map(v => getTextWidth(v.value, font) + PADDING * 2).reduce((v, acc) => v + acc, 0);
    ctx.fillStyle = currentPalette['databox-bg'];
    ctx.fillRect(bounds.x + PADDING, bounds.y + PADDING, bgWidth, height);
    ctx.fillStyle = currentPalette['databox-text-default'];
    ctx.fillText(series.title, bounds.x + PADDING * 2, bounds.y + PADDING * 4);
    x += titleWidth + PADDING * 2;
    series.lines.forEach(line => {
        if (line.colors && line.colors[0]) {
            ctx.fillStyle = line.colors[0];
        }
        ctx.fillText(line.value, x, bounds.y + PADDING * 4);
        x += getTextWidth(line.value, font) + PADDING * 2;
    });
};
