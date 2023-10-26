import React, { memo, useCallback, useMemo } from 'react';
import { DrawingSettingsSection } from '../drawing-settings-section/drawing-settings-section.component';
import { DrawingSettingsGroup } from '../drawing-settings-section/drawing-settings-group';
import { DrawingSettingsItem } from '../drawing-settings-section/drawing-settings-item';
import { getPricePrecisionFormatter } from '../../../../utils/inputs.utils';
import { PriceIncrementsUtils } from '@devexperts/dxcharts-lite/dist/chart/utils/price-increments.utils';
import { Checkbox } from '../../../../chart-kit/Checkbox/Checkbox.component';
import { DrawingSettingsCheckboxStyled } from '../drawing-settings-section/drawing-settings-common.styled';
import { NumericStepper } from '../../../../chart-kit/NumericStepper/NumericStepper.component';
import { Lens } from 'monocle-ts';
import { pipe } from 'fp-ts/function';
import { option, array } from 'fp-ts';
import { not } from 'fp-ts/Predicate';
import { constVoid, identity } from 'fp-ts/function';
import { LineStyleGroup } from './components/groups/line-style-group.component';
const priceLineLens = Lens.fromPath();
const priceLineKeyPointsLens = priceLineLens(['keyPoints']);
const priceLineShowPriceLens = priceLineLens(['properties', 'showPrice']);
const priceLineExtendRightLens = priceLineLens(['properties', 'style', 'extendRight']);
const priceLineExtendLeftLens = priceLineLens(['properties', 'style', 'extendLeft']);
export const PriceLineSettings = memo((props) => {
    const drawingProperties = props.value.properties;
    const { value, onValueChange, palette, instrument, drawingsDict } = props;
    const currentPrice = value.keyPoints[0] && value.keyPoints[0].value;
    const coordinatesSectionDict = drawingsDict.popup.sections.coordinates;
    const extendSectionDict = drawingsDict.popup.sections.extend;
    const styleSectionDict = drawingsDict.popup.sections.style;
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [value, onValueChange]);
    const updatePrice = useCallback((changedPrice) => pipe(value.keyPoints, array.modifyAt(0, v => ({ ...v, value: changedPrice })), option.fold(constVoid, keyPoints => createHandler(priceLineKeyPointsLens, keyPoints))), [createHandler, value.keyPoints]);
    const updateShowPrice = useCallback((isShowPrice) => createHandler(priceLineShowPriceLens, isShowPrice), [createHandler]);
    const updateExtendLeft = useCallback((isExtendLeft) => pipe(!drawingProperties.style.extendRight && !isExtendLeft, option.fromPredicate(not(identity)), option.fold(constVoid, () => createHandler(priceLineExtendLeftLens, Boolean(isExtendLeft)))), [createHandler, drawingProperties.style.extendRight]);
    const updateExtendRight = useCallback((isExtendRight) => pipe(!drawingProperties.style.extendLeft && !isExtendRight, option.fromPredicate(not(identity)), option.fold(constVoid, () => createHandler(priceLineExtendRightLens, Boolean(isExtendRight)))), [createHandler, drawingProperties.style.extendLeft]);
    const pointValue = useMemo(() => (value.keyPoints[0] !== undefined ? value.keyPoints[0].value : undefined), [value.keyPoints]);
    const step = useMemo(() => instrument !== undefined && pointValue !== undefined
        ? PriceIncrementsUtils.getPriceIncrement(pointValue, instrument.priceIncrements)
        : 0, [pointValue, instrument]);
    const pricePrecision = useMemo(() => PriceIncrementsUtils.calculatePrecision(step), [step]);
    return (React.createElement(React.Fragment, null,
        pointValue && (React.createElement(DrawingSettingsSection, { title: coordinatesSectionDict.title },
            React.createElement(DrawingSettingsGroup, null,
                React.createElement(DrawingSettingsItem, { label: coordinatesSectionDict.priceLabel },
                    React.createElement(NumericStepper, { min: 0, max: Number.POSITIVE_INFINITY, step: step, value: currentPrice, onValueChange: updatePrice, formatter: getPricePrecisionFormatter(pricePrecision) }))),
            React.createElement(DrawingSettingsGroup, null,
                React.createElement(DrawingSettingsItem, null,
                    React.createElement(DrawingSettingsCheckboxStyled, null,
                        React.createElement(Checkbox, { value: drawingProperties.showPrice, onValueChange: updateShowPrice }),
                        React.createElement("span", null, coordinatesSectionDict.priceCheckbox)))))),
        React.createElement(DrawingSettingsSection, { title: styleSectionDict.title },
            React.createElement(LineStyleGroup, { value: value, onValueChange: onValueChange, palette: palette })),
        React.createElement(DrawingSettingsSection, { title: extendSectionDict.title },
            React.createElement(DrawingSettingsGroup, { vertical: true },
                React.createElement(DrawingSettingsItem, null,
                    React.createElement(DrawingSettingsCheckboxStyled, null,
                        React.createElement(Checkbox, { value: drawingProperties.style.extendLeft, onValueChange: updateExtendLeft }),
                        React.createElement("span", null, extendSectionDict.leftCheckbox))),
                React.createElement(DrawingSettingsItem, null,
                    React.createElement(DrawingSettingsCheckboxStyled, null,
                        React.createElement(Checkbox, { value: drawingProperties.style.extendRight, onValueChange: updateExtendRight }),
                        React.createElement("span", null, extendSectionDict.rightCheckbox)))))));
});
