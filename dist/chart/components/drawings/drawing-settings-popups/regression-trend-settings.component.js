import { deviationSources, } from '@dx-private/dxchart5-modules/dist/drawings/figures/RegressionTrend';
import { flow } from 'fp-ts/function';
import { Lens } from 'monocle-ts';
import React, { memo, useCallback, useState } from 'react';
import { Checkbox } from '../../../../chart-kit/Checkbox/Checkbox.component';
import { DrawingSettingsGroup } from '../drawing-settings-section/drawing-settings-group';
import { DrawingSettingsItem } from '../drawing-settings-section/drawing-settings-item';
import { DrawingSettingsSection } from '../drawing-settings-section/drawing-settings-section.component';
import { DrawingSettingsCheckboxStyled, DrawingsSettingsMenuItemStyled, DrawingsSettingsSelectboxStyled, } from '../drawing-settings-section/drawing-settings-common.styled';
import { RegressionTrendStylesGroup } from './components/groups/regression-trend-styles-group.component';
import { RegressionTrendCoefGroup } from './components/groups/regression-trend-coef-group.component';
import { DateCoordinatesGroup } from './components/groups/date-coordinates-group.component';
const regressionTrendLens = Lens.fromPath();
const useUpperDeviationLens = regressionTrendLens(['properties', 'deviation', 'useUpperDeviation']);
const useLowerDeviationLens = regressionTrendLens(['properties', 'deviation', 'useLowerDeviation']);
const regressionTrendDeviationSourceLens = regressionTrendLens(['properties', 'deviation', 'source']);
const regressionTrendExtendLinesLens = regressionTrendLens(['properties', 'extendLines']);
const regressionTrendPearsonRLens = regressionTrendLens(['properties', 'pearsonR']);
const regressionTrendSectionsLens = regressionTrendLens(['properties', 'sections']);
const keyPointsLens = regressionTrendLens(['keyPoints']);
export const RegressionTrendSettings = memo((props) => {
    const { value, onValueChange, palette, instrument, currentTimezone, drawingsDict } = props;
    const drawingProperties = value.properties;
    const styleSectionDict = drawingsDict.popup.sections.style;
    const coordinatesSectionDict = drawingsDict.popup.sections.coordinates;
    const [isRegressionTrendSelectboxOpened, toggleRegressionTrendSelectBox] = useState(false);
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [value, onValueChange]);
    const updateCoordinates = useCallback((value) => createHandler(keyPointsLens, value), [createHandler]);
    const onUseUpperDeviationHandler = useCallback(flow(() => !drawingProperties.deviation.useUpperDeviation, value => createHandler(useUpperDeviationLens, value)), [createHandler, drawingProperties]);
    const onUseLowerDeviationHandler = useCallback(flow(() => !drawingProperties.deviation.useLowerDeviation, value => createHandler(useLowerDeviationLens, value)), [createHandler, drawingProperties]);
    const updateRegressionTrendSections = useCallback((regressionTrendSections) => createHandler(regressionTrendSectionsLens, regressionTrendSections), [createHandler]);
    const onDeviationSourceHandler = useCallback((selectboxValue) => {
        if (isDeviationSource(selectboxValue)) {
            createHandler(regressionTrendDeviationSourceLens, selectboxValue);
        }
    }, [createHandler]);
    const onExtendLinesHandler = useCallback(flow(() => !drawingProperties.extendLines, value => createHandler(regressionTrendExtendLinesLens, value)), [createHandler, drawingProperties]);
    const onPearsonRHandler = useCallback(flow(() => !drawingProperties.pearsonR, value => createHandler(regressionTrendPearsonRLens, value)), [createHandler, drawingProperties]);
    return (React.createElement(React.Fragment, null,
        React.createElement(DrawingSettingsSection, { title: coordinatesSectionDict.title },
            React.createElement(DateCoordinatesGroup, { value: value.keyPoints, onValueChange: updateCoordinates, instrument: instrument, drawingsDict: drawingsDict, currentTimezone: currentTimezone, withPrice: false })),
        React.createElement(DrawingSettingsSection, { title: drawingsDict.regressionTrend.deviation.title },
            React.createElement(RegressionTrendCoefGroup, { dictionary: drawingsDict, value: drawingProperties.sections, onValueChange: updateRegressionTrendSections }),
            React.createElement(DrawingSettingsGroup, null,
                React.createElement(DrawingSettingsItem, null,
                    React.createElement(DrawingSettingsCheckboxStyled, null,
                        React.createElement(Checkbox, { value: drawingProperties.deviation.useUpperDeviation, onValueChange: onUseUpperDeviationHandler }),
                        React.createElement("span", null, drawingsDict.regressionTrend.deviation.useUpperDeviation)))),
            React.createElement(DrawingSettingsGroup, null,
                React.createElement(DrawingSettingsItem, null,
                    React.createElement(DrawingSettingsCheckboxStyled, null,
                        React.createElement(Checkbox, { value: drawingProperties.deviation.useLowerDeviation, onValueChange: onUseLowerDeviationHandler }),
                        React.createElement("span", null, drawingsDict.regressionTrend.deviation.useLowerDeviation)))),
            React.createElement(DrawingSettingsGroup, null,
                React.createElement(DrawingSettingsItem, null,
                    React.createElement("span", null, drawingsDict.regressionTrend.deviation.source)),
                React.createElement(DrawingSettingsItem, null,
                    React.createElement(DrawingsSettingsSelectboxStyled, { value: drawingProperties.deviation.source, onValueChange: onDeviationSourceHandler, isOpened: isRegressionTrendSelectboxOpened, onToggle: value => toggleRegressionTrendSelectBox(Boolean(value)) }, deviationSources.map((source) => (React.createElement(DrawingsSettingsMenuItemStyled, { key: source, value: source, isActive: drawingProperties.deviation.source === source }, source))))))),
        React.createElement(DrawingSettingsSection, { title: styleSectionDict.title },
            React.createElement(RegressionTrendStylesGroup, { dictionary: drawingsDict, palette: palette, value: drawingProperties.sections, onValueChange: updateRegressionTrendSections }),
            React.createElement(DrawingSettingsGroup, null,
                React.createElement(DrawingSettingsItem, null,
                    React.createElement(DrawingSettingsCheckboxStyled, null,
                        React.createElement(Checkbox, { value: drawingProperties.extendLines, onValueChange: onExtendLinesHandler }),
                        React.createElement("span", null, drawingsDict.regressionTrend.style.extendLines)))),
            React.createElement(DrawingSettingsGroup, null,
                React.createElement(DrawingSettingsItem, null,
                    React.createElement(DrawingSettingsCheckboxStyled, null,
                        React.createElement(Checkbox, { value: drawingProperties.pearsonR, onValueChange: onPearsonRHandler }),
                        React.createElement("span", null, drawingsDict.regressionTrend.style.pearsonR)))))));
});
const isDeviationSource = (selectboxValue) => {
    return deviationSources.some(source => source === selectboxValue);
};
