import { memoize } from '@devexperts/dxcharts-lite/dist/chart/utils/performance/memoize.utils';
const canvas = document.createElement('canvas');
export function getTextWidth(text, font) {
    const context = canvas.getContext('2d');
    if (context) {
        context.font = font;
        const metrics = context.measureText(text);
        return metrics.width;
    }
    return 0;
}
function getSuffixFromName(value, regExp) {
    const suffixArray = value.match(regExp);
    if (suffixArray) {
        return suffixArray[0];
    }
    return '';
}
export const getParsedName = memoize((value, fontParams, overflowWidth) => {
    if (getTextWidth(value, fontParams) > overflowWidth) {
        const dotsWidth = getTextWidth('...', fontParams);
        const suffix = getSuffixFromName(value, /[ ]{1}(\(\d+\))$/g);
        const suffixWidth = getTextWidth(suffix.slice(1), fontParams);
        const textWithoutSuffix = value.slice(0, value.length - suffix.length);
        const delta = overflowWidth - dotsWidth - suffixWidth;
        let allowedText = '';
        for (const subText of textWithoutSuffix) {
            if (getTextWidth(allowedText.concat(subText), fontParams) >= delta) {
                break;
            }
            allowedText = allowedText.concat(subText);
        }
        return allowedText.concat('...').concat(suffix.slice(1));
    }
    return value;
});
