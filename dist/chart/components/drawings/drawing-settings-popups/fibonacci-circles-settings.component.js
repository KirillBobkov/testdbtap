import React, { memo, useCallback, useMemo } from 'react';
import { DateCoordinatesGroup } from './components/groups/date-coordinates-group.component';
import { DrawingSettingsSection } from '../drawing-settings-section/drawing-settings-section.component';
import { Lens } from 'monocle-ts';
import { mapFibCirclesToFibParts, mapFibPartsToFibCircles } from '../../../model/drawing.model';
import { pipe } from 'fp-ts/function';
import { array } from 'fp-ts';
import { CoeffGroup } from './components/groups/coeff-group.component';
import { FibLineStyleGroup } from './components/groups/fib-line-style-group.component';
import { FibonacciStylesGroup } from './components/groups/fib-styles-group.component';
import { BackgroundFillShortGroup } from './components/groups/background-fill-short-group.component';
const pathLens = Lens.fromPath();
const circlesStyles = pathLens(['properties', 'circles']);
const keyPointsLens = pathLens(['keyPoints']);
const circleLens = Lens.fromProp()('line').composeLens(Lens.fromProps()(['lineColor', 'lineDash', 'lineWidth']));
export const FibonacciCirclesSettings = memo((props) => {
    const { value, onValueChange, palette, instrument, currentTimezone, drawingsDict } = props;
    const drawingProperties = value.properties;
    const styleSectionDict = drawingsDict.popup.sections.style;
    const labelsSectionDict = drawingsDict.popup.sections.labels;
    const coordinatesSectionDict = drawingsDict.popup.sections.coordinates;
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [value, onValueChange]);
    const updateCoordinates = useCallback((keyPoints) => {
        createHandler(keyPointsLens, keyPoints);
    }, [createHandler]);
    const updateCirclesStyles = useCallback((value) => {
        createHandler(circlesStyles, value);
    }, [createHandler]);
    const applyToAll = useCallback(() => pipe(drawingProperties.circles, array.map(circleLens.set({
        lineWidth: drawingProperties.line.lineWidth,
        lineColor: drawingProperties.line.lineColor,
        lineDash: drawingProperties.line.lineDash,
    })), updateCirclesStyles), [updateCirclesStyles, drawingProperties]);
    const updateFibCirclesCircles = useCallback((fibParts) => createHandler(circlesStyles, mapFibPartsToFibCircles(fibParts)), [createHandler]);
    const fibonacciParts = useMemo(() => mapFibCirclesToFibParts(drawingProperties.circles), [drawingProperties.circles]);
    return (React.createElement(React.Fragment, null,
        React.createElement(DrawingSettingsSection, { title: coordinatesSectionDict.title },
            React.createElement(DateCoordinatesGroup, { value: value.keyPoints, onValueChange: updateCoordinates, instrument: instrument, drawingsDict: drawingsDict, currentTimezone: currentTimezone, withPrice: true })),
        React.createElement(DrawingSettingsSection, { title: labelsSectionDict.title },
            React.createElement(CoeffGroup, { value: value, onValueChange: onValueChange, drawingsDict: drawingsDict })),
        React.createElement(DrawingSettingsSection, { title: styleSectionDict.title },
            React.createElement(FibLineStyleGroup, { value: value, onValueChange: onValueChange, palette: palette, drawingsDict: drawingsDict, applyToAll: applyToAll }),
            React.createElement(FibonacciStylesGroup, { value: fibonacciParts, onValueChange: updateFibCirclesCircles, palette: palette }),
            React.createElement(BackgroundFillShortGroup, { value: value, onValueChange: onValueChange, drawingsDict: drawingsDict }))));
});
