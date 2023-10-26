import React, { memo, useCallback } from 'react';
import { Lens } from 'monocle-ts';
import { DateCoordinatesGroup } from './components/groups/date-coordinates-group.component';
import { DrawingSettingsSection } from '../drawing-settings-section/drawing-settings-section.component';
import { FibonacciStylesGroup } from './components/groups/fib-styles-group.component';
import { BackgroundFillShortGroup } from './components/groups/background-fill-short-group.component';
import { ExtendGroup } from './components/groups/extend-group.component';
import { pipe } from 'fp-ts/function';
import { array } from 'fp-ts';
import { FibLabelsGroup } from './components/groups/fib-labels-group.component';
import { FibLineStyleGroup } from './components/groups/fib-line-style-group.component';
import { PriceCoeffGroup } from './components/groups/price-coeff-group.component';
const fibCLens = Lens.fromPath();
const keyPointsLens = fibCLens(['keyPoints']);
const zonesLens = fibCLens(['properties', 'zones']);
export const FibonacciChannelSettings = memo((props) => {
    const { value, onValueChange, instrument, currentTimezone, drawingsDict, palette } = props;
    const drawingProperties = value.properties;
    const styleSectionDict = drawingsDict.popup.sections.style;
    const labelsSectionDict = drawingsDict.popup.sections.labels;
    const extendSectionDict = drawingsDict.popup.sections.extend;
    const coordinatesSectionDict = drawingsDict.popup.sections.coordinates;
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [value, onValueChange]);
    const updateCoordinates = useCallback((keyPoints) => createHandler(keyPointsLens, keyPoints), [createHandler]);
    const updateFibChannelParts = useCallback((fibZones) => createHandler(zonesLens, fibZones), [createHandler]);
    const applyToAll = useCallback(() => pipe(drawingProperties.zones, array.map(level => ({
        ...level,
        lineWidth: drawingProperties.line.lineWidth,
        lineColor: drawingProperties.line.lineColor,
        lineDash: drawingProperties.line.lineDash,
    })), updateFibChannelParts), [drawingProperties, updateFibChannelParts]);
    return (React.createElement(React.Fragment, null,
        React.createElement(DrawingSettingsSection, { title: coordinatesSectionDict.title },
            React.createElement(DateCoordinatesGroup, { value: value.keyPoints, onValueChange: updateCoordinates, drawingsDict: drawingsDict, instrument: instrument, currentTimezone: currentTimezone, withPrice: true })),
        React.createElement(DrawingSettingsSection, { title: labelsSectionDict.title },
            React.createElement(FibLabelsGroup, { value: value, onValueChange: onValueChange, drawingsDict: drawingsDict }),
            React.createElement(PriceCoeffGroup, { value: value, onValueChange: onValueChange, drawingsDict: drawingsDict })),
        React.createElement(DrawingSettingsSection, { title: styleSectionDict.title },
            React.createElement(FibLineStyleGroup, { value: value, onValueChange: onValueChange, drawingsDict: drawingsDict, applyToAll: applyToAll, palette: palette }),
            React.createElement(FibonacciStylesGroup, { value: drawingProperties.zones, onValueChange: updateFibChannelParts, palette: palette }),
            React.createElement(BackgroundFillShortGroup, { value: value, onValueChange: onValueChange, drawingsDict: drawingsDict })),
        React.createElement(DrawingSettingsSection, { title: extendSectionDict.title },
            React.createElement(ExtendGroup, { value: value, onValueChange: onValueChange, drawingsDict: drawingsDict }))));
});
