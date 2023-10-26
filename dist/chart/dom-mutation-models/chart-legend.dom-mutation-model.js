import { CHART_UUID, CanvasElement } from '@devexperts/dxcharts-lite/dist/chart/canvas/canvas-bounds-container';
import { uuid } from '@devexperts/dxcharts-lite/dist/chart/utils/uuid.utils';
import { animationFrameThrottled } from '@devexperts/dxcharts-lite/dist/chart/utils/performance/request-animation-frame-throttle.utils';
import { firstOf } from '@devexperts/dxcharts-lite/dist/chart/utils/array.utils';
import { array, eq, option, string } from 'fp-ts';
import { observable } from 'fp-ts-rxjs';
import { sequenceT } from 'fp-ts/Apply';
import { fromEquals } from 'fp-ts/Eq';
import { constVoid, pipe } from 'fp-ts/function';
import React from 'react';
import { combineLatest, merge } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { context } from '../../context/context2';
import { newSink } from '../../context/sink2';
import { createAdapter } from '../../utils/adapter.utils';
import { createPropertyAdapter } from '../../utils/property.utils';
import { setDirectHTMLValue } from '../../utils/react.utils';
import { dashSign, minusSign, trueMinusSign } from '../../utils/symbol-constants';
import { deepEqual } from '@devexperts/dxcharts-lite/dist/chart/utils/object.utils';
import { floor } from '@devexperts/dxcharts-lite/dist/chart/utils/math.utils';
export const DROPDOWN_START_Y_POSITION = 70;
export const createChartLegendDomMutationModel = context.combine(context.key()('chart'), context.key()('chartLegendVM'), context.key()('chartConfiguratorViewModel'), context.key()('themeViewModel'), context.key()('chartTypeViewModel'), (chart, chartLegendVM, chartConfiguratorViewModel, themeViewModel, chartTypeViewModel) => {
    const legendContainer = {
        switcherPositionRef: React.createRef(),
        containerRef: React.createRef(),
        setLegendFitsContent: React.createRef(),
        setHeight: React.createRef(),
    };
    const time = React.createRef();
    const open = React.createRef();
    const close = React.createRef();
    const high = React.createRef();
    const low = React.createRef();
    const volumeMain = React.createRef();
    const separateVolume = {
        valueRef: React.createRef(),
        containerRef: React.createRef(),
    };
    const [setStackedStudySeries, stackedStudySeries] = createPropertyAdapter([]);
    const [setSeparateStudySeries, separateStudySeries] = createPropertyAdapter([]);
    const [setSecondarySeries, secondarySeries] = createPropertyAdapter([]);
    const [syncState, syncStateObservable] = createAdapter();
    const animFrameId = `legend_${uuid()}`;
    const createStackedStudyRefHoldersEffect = pipe(chartLegendVM.state, map(({ series }) => series.stackedStudiesSeries), distinctUntilChanged(studiesArrayEq.equals), map(studySeries2RefHolder), tap(setStackedStudySeries));
    const createSeparateStudyRefHoldersEffect = pipe(chartLegendVM.state, map(({ series }) => series.separateStudiesSeries), distinctUntilChanged(studiesArrayEq.equals), map(studySeries2RefHolder), tap(setSeparateStudySeries));
    const createSecondarySeriesRefHoldersEffect = pipe(chartLegendVM.state, map(({ series }) => series.secondarySeries), distinctUntilChanged(compareArrayEq.equals), map(secondarySeries2RefHolder), tap(setSecondarySeries));
    const studiesAndVolumesBounds = chart.bounds.observeAnyBoundsChanged().pipe(observable.map(() => ({
        ...chart.bounds.getBoundsPanes(),
        chart: chart.bounds.getBounds(CanvasElement.PANE_UUID(CHART_UUID)),
    })));
    // it's important to update values only after all creation effects
    const updateChartLegendEffect = pipe(combineLatest([
        chartConfiguratorViewModel.state.pipe(map(s => s.settings.chartReact.legend), distinctUntilChanged(deepEqual)),
        chartLegendVM.state,
        studiesAndVolumesBounds,
        chartLegendVM.legendPosition,
        syncStateObservable,
    ]), tap(([, { series }, bounds, legendPosition]) => {
        animationFrameThrottled(animFrameId, () => {
            const activeTheme = themeViewModel.activeTheme.getValue();
            const colors = chartConfiguratorViewModel.state.getValue().settings.chartCore.themes[activeTheme];
            const chartType = chartTypeViewModel.type.getValue();
            updateContainerBounds(legendContainer, legendPosition, bounds);
            updateTime(series.mainSeries.time, time);
            updateMainSeries(series.mainSeries, pm, colors, chartType);
            updateVolumeMainSeries(series.mainSeries.volume, series.mainSeries, volumeMain, colors, chartType);
            updateSeparateVolume(series.volume, legendPosition, series.mainSeries, separateVolume, colors, chartType, bounds);
            updateStudySeries(stackedStudySeries.getValue(), series.stackedStudiesSeries, legendPosition);
            updateStudySeries(separateStudySeries.getValue(), series.separateStudiesSeries, legendPosition, bounds);
            updateSecondarySeries(secondarySeries.getValue(), series.secondarySeries);
        });
    }));
    const effects = merge(createSecondarySeriesRefHoldersEffect, createStackedStudyRefHoldersEffect, createSeparateStudyRefHoldersEffect, updateChartLegendEffect);
    const pm = {
        legendContainer,
        time,
        open,
        close,
        high,
        low,
        volumeMain,
        separateVolume,
        stackedStudySeries,
        separateStudySeries,
        secondarySeries,
        syncState,
    };
    return newSink(pm, effects);
});
const studiesEq = fromEquals((x, y) => x.uuid === y.uuid);
const studiesArrayEq = array.getEq(studiesEq);
const compareSeriesEq = eq.struct({
    id: string.Eq,
    symbol: string.Eq,
    chartType: string.Eq,
    color: string.Eq,
});
const compareArrayEq = array.getEq(compareSeriesEq);
const updateContainerBounds = (container, position, bounds) => pipe(sequenceT(option.Apply)(option.fromNullable(container.switcherPositionRef.current), option.fromNullable(container.containerRef.current), option.fromNullable(container.setLegendFitsContent.current), option.fromNullable(container.setHeight.current)), option.fold(constVoid, ([switcher, currentHeight, setLegendFitsContent, setHeight]) => {
    let height = 0;
    if (bounds.chart) {
        const containerHeight = currentHeight.offsetHeight ?? 0;
        const maxHeight = bounds.chart.height - DROPDOWN_START_Y_POSITION;
        const _height = maxHeight > containerHeight ? containerHeight : maxHeight;
        height = _height >= 0 ? _height : 0;
        setLegendFitsContent(containerHeight < maxHeight);
    }
    else {
        setLegendFitsContent(true);
    }
    setHeight(floor(height));
    const pos = calculatePosition(switcher, position, bounds.chart);
    switcher.style.top = `${pos.y}px`;
    switcher.style.left = `${pos.x}px`;
}));
const updateTime = (time, timeNode) => pipe(option.fromNullable(timeNode.current), option.fold(constVoid, node => {
    setDirectHTMLValue(node, time);
}));
const updateVolumeMainSeries = (volume, series, volumeNode, colors, chartType) => pipe(sequenceT(option.Apply)(option.fromNullable(volumeNode.current), volume), option.fold(constVoid, ([volumeNode, volume]) => {
    const color = getColorByDirection(chartType, colors, series.direction);
    setDirectHTMLValue(volumeNode, volume);
    volumeNode.style.color = color;
}));
const updateSeparateVolume = (volume, position, series, volumeNode, colors, chartType, bounds) => pipe(sequenceT(option.Apply)(option.fromNullable(volumeNode.valueRef.current), option.fromNullable(volumeNode.containerRef.current), volume), option.fold(constVoid, ([volumeValue, volumeContainer, volume]) => {
    const bound = bounds && bounds['volumes'];
    if (bound) {
        const pos = calculatePosition(volumeContainer, position, bound);
        // eslint-disable-next-line
        volumeContainer.style.top = `${pos.y}px`;
        // eslint-disable-next-line
        volumeContainer.style.left = `${pos.x}px`;
    }
    const color = getColorByDirection(chartType, colors, series.direction);
    setDirectHTMLValue(volumeValue, volume);
    volumeValue.style.color = color;
}));
const updateMainSeries = (series, pm, colors, chartType) => {
    const color = getColorByDirection(chartType, colors, series.direction);
    pipe(option.fromNullable(pm.open.current), option.fold(constVoid, open => {
        setDirectHTMLValue(open, series.open);
        open.style.color = color;
    }));
    pipe(option.fromNullable(pm.close.current), option.fold(constVoid, close => {
        setDirectHTMLValue(close, series.close);
        close.style.color = color;
    }));
    pipe(option.fromNullable(pm.low.current), option.fold(constVoid, low => {
        setDirectHTMLValue(low, series.low);
        low.style.color = color;
    }));
    pipe(option.fromNullable(pm.high.current), option.fold(constVoid, high => {
        setDirectHTMLValue(high, series.high);
        high.style.color = color;
    }));
};
const updateStudySeries = (studyRefHolders, studySeries, position, bounds) => studyRefHolders.forEach((refHolder, i) => {
    const series = studySeries[i];
    const bound = bounds && bounds[series.uuid];
    if (bound && refHolder.ref.current) {
        const pos = calculatePosition(refHolder.ref.current, position, bound);
        // eslint-disable-next-line
        refHolder.ref.current.style.top = `${pos.y}px`;
        // eslint-disable-next-line
        refHolder.ref.current.style.left = `${pos.x}px`;
    }
    refHolder.lines.forEach((pLine, j) => {
        const sLine = pipe(option.fromNullable(series), option.chain(series => option.fromNullable(series.lines[j])));
        pipe(sequenceT(option.Apply)(option.fromNullable(pLine.ref.current), sLine), option.fold(constVoid, ([node, sLine]) => {
            setDirectHTMLValue(node, formatStudyValue(sLine.value));
            node.style.color = firstOf(sLine.colors) ?? 'inherit';
        }));
    });
});
const updateSecondarySeries = (seriesRefHolders, secondarySeries) => seriesRefHolders.forEach((refHolder, i) => pipe(sequenceT(option.Apply)(option.fromNullable(refHolder.ref.current), option.fromNullable(secondarySeries[i])), option.fold(constVoid, ([node, secondary]) => {
    setDirectHTMLValue(node, secondary.price);
    node.style.color = secondary.color;
})));
const secondarySeries2RefHolder = (series) => series.map(model => ({
    model,
    ref: React.createRef(),
}));
const studySeries2RefHolder = (studies) => studies.map(study => ({
    uuid: study.uuid,
    ref: React.createRef(),
    title: study.title,
    lines: study.lines
        // looks like dirty hack, but there are hundreds of lines which should be visible,
        // but they don't have labelVisible property set :\
        .filter(line => line.labelVisible === undefined || line.labelVisible)
        .map(line => ({ title: line.title, ref: React.createRef() })),
}));
export const getColorByDirection = (barType, colors, direction) => {
    switch (barType) {
        case 'bar':
            return colors.barTheme[direction + 'Color'];
        case 'line':
            return colors.lineTheme[direction + 'Color'];
        case 'equivolume':
            return colors.equivolumeTheme[direction + 'Color'];
        case 'candle':
        default:
            return colors.candleTheme[direction + 'Color'];
    }
};
const formatStudyValue = (value) => {
    const parsedString = parseFloat(value);
    if (isNaN(parsedString)) {
        return dashSign;
    }
    else if (parsedString % 1 === 0) {
        return parsedString.toFixed(2).replace(trueMinusSign, minusSign);
    }
    else {
        const roundedValue = Math.floor(parseFloat(parsedString.toFixed(3)) * 100) / 100;
        return roundedValue.toFixed(2).replace(trueMinusSign, minusSign);
    }
};
const calculatePosition = (ref, position, bounds) => {
    const x = Math.max(Math.min(bounds.x + bounds.width - ref.clientWidth, position.x), 0);
    return {
        x,
        y: bounds.y,
    };
};
