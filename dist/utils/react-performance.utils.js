import React, { Profiler } from 'react';
import { pipe } from 'fp-ts/function';
import { array, number, ord, string } from 'fp-ts';
import { contramap } from 'fp-ts/Ord';
import { floor } from '@devexperts/dxcharts-lite/dist/chart/utils/math.utils';
import { reduce, reduceWithIndex, filter, collect, keys } from 'fp-ts/Record';
// Base report. Groups all render profiles by name.
const allRenderProfiles = [];
const report = () => {
    const grouped = {};
    allRenderProfiles.forEach(p => {
        let g = grouped[p.name];
        if (!g) {
            g = {
                ads: [],
                bds: [],
            };
            grouped[p.name] = g;
        }
        g.ads.push(floor(p.ad));
        g.bds.push(floor(p.bd));
    });
    const result = {};
    // eslint-disable-next-line guard-for-in
    for (const name in grouped) {
        const g = grouped[name];
        result[name] = {
            meanAd: g.ads.reduce((acc, cur) => acc + cur, 0) / g.ads.length,
            meanBd: g.bds.reduce((acc, cur) => acc + cur, 0) / g.bds.length,
            maxAd: Math.max(...g.ads),
            maxBd: Math.max(...g.bds),
            renders: g.ads.length,
        };
    }
    return result;
};
const formatReportSection = (reportString, sectionName) => {
    if (reportString !== '') {
        return `${sectionName}:\n--\n${reportString}--\n`;
    }
    return '';
};
// Warnings report. Opinionated configurable report to pay attention to.
const ALERT_RENDERS_NUMBER = 100;
const ALERT_RENDER_TIME_NUMBER = 5000; // > 5 seconds
const ALERT_MEAN_ACTUAL_DURATION = 20;
const ALERT_MEAN_BASE_DURATION = 150;
const warnings = () => {
    const r = report();
    // alert renders number
    const rendersAlert = pipe(r, filter(ds => ds.renders > ALERT_RENDERS_NUMBER), reduceWithIndex(string.Ord)('', (name, acc, ds) => `${acc}${name} ${ds.renders}\n`));
    // alert render time
    const renderTimeAlert = pipe(r, filter(ds => ds.renders * ds.meanAd > ALERT_RENDER_TIME_NUMBER), reduceWithIndex(string.Ord)('', (name, acc, ds) => `${acc}${name} ${ds.renders * ds.meanAd}\n`)); // mean actual duration alert
    const adAlert = pipe(r, filter(ds => ds.meanAd > ALERT_MEAN_ACTUAL_DURATION), reduceWithIndex(string.Ord)('', (name, acc, ds) => `${acc}${name} ${ds.meanAd}\n`));
    // mean base duration alert
    const bdAlert = pipe(r, filter(ds => ds.meanBd > ALERT_MEAN_BASE_DURATION), reduceWithIndex(string.Ord)('', (name, acc, ds) => `${acc}${name} ${ds.meanBd}\n`));
    const result = `
		${formatReportSection(rendersAlert, `Renders > ${ALERT_RENDERS_NUMBER}`)}
		${formatReportSection(renderTimeAlert, `Render time > ${ALERT_RENDER_TIME_NUMBER}`)}
		${formatReportSection(adAlert, `Actual duration > ${ALERT_MEAN_ACTUAL_DURATION}`)}
		${formatReportSection(bdAlert, `Base duration > ${ALERT_MEAN_BASE_DURATION}`)}
	`;
    console.log(result.trim().replace(/\t/g, ''));
};
// Sorts by.
const nameOrd = ord.reverse(contramap((nds) => nds.name)(string.Ord));
const maxAdOrd = ord.reverse(contramap((nds) => nds.maxAd)(number.Ord));
const maxBdOrd = ord.reverse(contramap((nds) => nds.maxBd)(number.Ord));
const meanAdOrd = ord.reverse(contramap((nds) => nds.meanAd)(number.Ord));
const meanBdOrd = ord.reverse(contramap((nds) => nds.meanBd)(number.Ord));
const rendersOrd = ord.reverse(ord.contramap((nds) => nds.renders)(number.Ord));
const sortBy = (ord) => () => pipe(report(), collect(string.Ord)((name, ds) => ({ name, ...ds })), array.sort(ord));
// Report for performance tests.
const perfTest = () => {
    const r = report();
    return {
        renders: pipe(r, reduce(string.Ord)(0, (acc, ds) => acc + ds.renders)),
        uniqueComponents: pipe(r, keys).length,
        renderTime: pipe(r, reduce(string.Ord)(0, (acc, ds) => acc + ds.renders * ds.meanAd)),
    };
};
/**
 * Analyze profile using window variable in "dev" mode.
 * Profiles are collected all the time. Calculations are made only when called.
 * @doc-tags debug,react
 */
window['__CHART_REACT_STATS'] = {
    allRenderProfiles,
    report,
    warnings,
    sortByName: sortBy(nameOrd),
    sortByMaxAD: sortBy(maxAdOrd),
    sortByMaxBD: sortBy(maxBdOrd),
    sortByMeanAD: sortBy(meanAdOrd),
    sortByMeanBD: sortBy(meanBdOrd),
    sortByRenders: sortBy(rendersOrd),
    perfTest,
};
/**
 * Creates a wrapper component for profiling.
 * @param name - name of original component
 * @param Component - original component
 */
export const createProfileFC = (name, Component) => props => {
    const onRender = (id, phase, actualDuration, baseDuration, startTime, commitTime, interactions) => {
        allRenderProfiles.push({
            name: id,
            phase,
            ad: actualDuration,
            bd: baseDuration,
        });
    };
    return React.createElement(Profiler, {
        id: name,
        onRender,
    }, React.createElement(Component, props));
};
