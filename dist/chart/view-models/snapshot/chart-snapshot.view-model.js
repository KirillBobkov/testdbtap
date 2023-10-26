import { context } from '../../../context/context2';
import { newSink } from '../../../context/sink2';
import { merge } from 'rxjs';
import { writeToClipboard } from '../utils/ClipboardAPI';
import { drawLegendOnCanvas } from './snapshot-legend.drawer';
import { pipe } from 'fp-ts/function';
import { array } from 'fp-ts';
import { getDPR } from '@devexperts/dxcharts-lite/dist/chart/utils/device/device-pixel-ratio.utils';
/**
 * @doc-tags snapshot
 */
export const createChartSnapshotViewModel = context.combine(context.key()('localization'), context.key()('charts'), context.key()('chartLegendVMs'), context.key()('periodVMs'), context.key()('notificationVM'), context.key()('chartSharingProvider'), context.defer(drawLegendOnCanvas, 'chart', 'chartLegendVM', 'aggregationPeriodViewModel'), context.key()('snapshotCanvasRef'), context.key()('multiChartViewModel'), (localization, charts, chartLegendVMs, periodVMs, notificationVM, chartSharingProvider, deferDrawLegendOnCanvas, snapshotCanvasRef, multiChartViewModel) => {
    const drawLegendOnCanvases = charts.map((ci, idx) => deferDrawLegendOnCanvas({
        chart: ci,
        chartLegendVM: chartLegendVMs[idx],
        aggregationPeriodViewModel: periodVMs[idx],
    }).value);
    const createSnapshot = () => createMultiChartSnapshot(snapshotCanvasRef, charts, drawLegendOnCanvases, multiChartViewModel);
    const saveSnapshotToProvider = (options) => createSnapshot().then(blob => chartSharingProvider.uploadChartSnapshot(blob, options));
    const downloadSnapshot = () => downloadImage(createSnapshot());
    const copySnapshot = () => copyImage(createSnapshot(), localization, saveSnapshotToProvider).then(res => notificationVM.sendNotification(res));
    const copySnapshotLink = () => {
        const uploadResult = saveSnapshotToProvider();
        return copyLink(uploadResult, localization).then(res => notificationVM.sendNotification(res));
    };
    const shareToExternalResource = (options) => saveSnapshotToProvider(options).then(data => data.url);
    const effects = merge();
    return newSink({
        downloadSnapshot,
        copySnapshot,
        copySnapshotLink,
        shareToExternalResource,
    }, effects);
});
const downloadImage = (data) => data.then(blob => {
    const url = URL.createObjectURL(blob);
    const filename = `DXCharts Snapshot ${Date.now()}`;
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
const copyImage = async (data, localization, fallBack) => writeToClipboard(data, 'image/png')
    .then(() => localization.notifications.notificationImageCopy)
    .catch(async (e) => {
    console.warn(e.toString());
    const data = await fallBack();
    openLinkInNewTab(data.url);
    return localization.notifications.notificationFallback;
});
const copyLink = async (uploadResult, localization) => writeToClipboard(uploadResult.then(data => new Blob([data.url], { type: 'text/plain' })), 'text/plain')
    .then(() => localization.notifications.notificationLinkCopy)
    .catch(async (e) => {
    console.warn(e.toString());
    const data = await uploadResult;
    openLinkInNewTab(data.url);
    return localization.notifications.notificationFallback;
});
export const openLinkInNewTab = (link) => window.open(link, '_blank')?.focus();
const createMultiChartSnapshot = (snapshotCanvasRef, charts, drawLegendOnCanvases, multiChartLayoutVM) => {
    const currentCanvas = snapshotCanvasRef.current;
    return currentCanvas !== null
        ? pipe(charts, 
        // create tuple
        array.mapWithIndex((idx, ci) => [ci, drawLegendOnCanvases[idx]]), array.filter(([ci]) => ci.canvasBoundsContainer.isChartBoundsAvailable()), array.map(([ci, drawLegendOnCanvas]) => ci.snapshot
            .createSnapshot(drawLegendOnCanvas)
            .then(createImageBitmap)
            .then((bitmap) => [ci, bitmap])), blobs => Promise.all(blobs).then(bitmaps => {
            const ctx = currentCanvas.getContext('2d');
            if (ctx !== null) {
                const [multiChartRows, multiChartColumns] = multiChartLayoutVM.getLayout();
                const chartsWidth = bitmaps
                    .filter((bitmap, index) => index < multiChartColumns)
                    .reduce((total, [, bitmap]) => total + bitmap.width, 0);
                const chartsHeight = bitmaps
                    .filter((bitmap, index) => index < multiChartRows)
                    .reduce((total, [, bitmap]) => total + bitmap.height, 0);
                const DPI = getDPR();
                currentCanvas.width = DPI * chartsWidth;
                currentCanvas.height = DPI * chartsHeight;
                bitmaps.forEach(([ci, bitmap]) => {
                    const [x, y] = resolveBitmapPositionNxN(ci, bitmap, multiChartRows, multiChartColumns);
                    ctx.drawImage(bitmap, x, y, bitmap.width * DPI, bitmap.height * DPI);
                });
                return new Promise((resolve, fail) => currentCanvas.toBlob(blob => (blob ? resolve(blob) : fail('Blob is null'))));
            }
            else {
                return Promise.reject();
            }
        }))
        : Promise.reject();
};
/**
 * Calculates the position of a chart image on a multiChart snapshot,
 * based on the chart's bitmap size, index(order), and the dimensions of the multiChart.
 * Returns an array with coords for top left corner with DPI correction
 */
function resolveBitmapPositionNxN(ci, bitmap, rows, cols) {
    if (rows === 1 && cols === 1) {
        return [0, 0];
    }
    const DPI = getDPR();
    const idx = parseInt(ci.id, 10);
    const { width, height } = bitmap;
    const columnIndex = (idx + 1) % cols || cols;
    const rowIndex = rows === 1 ? rows : cols === 1 ? (idx % rows) + 1 : Math.floor(idx / rows) + 1;
    return [(columnIndex - 1) * width * DPI, (rowIndex - 1) * height * DPI];
}
