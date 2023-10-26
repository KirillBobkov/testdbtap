import React, { useCallback, memo } from 'react';
import { DrawingSettingsGroup } from '../../../drawing-settings-section/drawing-settings-group';
import { Checkbox } from '../../../../../../chart-kit/Checkbox/Checkbox.component';
import { Lens } from 'monocle-ts';
import { array, option } from 'fp-ts';
import { constVoid, pipe } from 'fp-ts/function';
import { DrawingSettingsCheckboxStyled } from '../../../drawing-settings-section/drawing-settings-common.styled';
import { RegressionTrendDrawingSettingsItemStyled } from './regression-trend-styles-group.styled';
import { LineStyleControl } from '../line-style-control.component';
import { PopupEventTargetConsumer } from '../../../../../../chart-kit/Popup/PopupUI.component';
const regressionTrendSectionLineStyleLens = Lens.fromProp()('line');
const regressionTrendSectionVisibleLens = Lens.fromProp()('visible');
export const RegressionTrendStylesGroup = memo(props => {
    const { palette, value, onValueChange, dictionary } = props;
    const updateVisibilityHandler = useCallback((visible, index) => pipe(value, array.modifyAt(index, regressionTrendSectionVisibleLens.set(visible)), option.fold(constVoid, onValueChange)), [onValueChange, value]);
    const updateLineStylesHandler = useCallback((line, index) => pipe(value, array.modifyAt(index, regressionTrendSectionLineStyleLens.set(line)), option.fold(constVoid, onValueChange)), [value, onValueChange]);
    return (React.createElement(PopupEventTargetConsumer, null, eventTarget => value.map((regressionTrendSection, index) => (React.createElement(RegressionTrendStyleGroupItem, { key: `regression-trend--style-group-item-${index}`, regressionTrendSection: regressionTrendSection, index: index, palette: palette, dictionary: dictionary, changeVisibility: updateVisibilityHandler, changeLineStyle: updateLineStylesHandler, parentEventTarget: eventTarget })))));
});
const RegressionTrendStyleGroupItem = memo(props => {
    const { regressionTrendSection, index, changeVisibility, dictionary, changeLineStyle, parentEventTarget } = props;
    const changeVisibilityHandler = useCallback((visible) => changeVisibility(Boolean(visible), index), [changeVisibility, index]);
    const changeLineStyleHandler = useCallback((line) => changeLineStyle(line, index), [changeLineStyle, index]);
    return (React.createElement(DrawingSettingsGroup, null,
        React.createElement(RegressionTrendDrawingSettingsItemStyled, { key: `checkbox_${index}` },
            React.createElement(DrawingSettingsCheckboxStyled, null,
                React.createElement(Checkbox, { value: regressionTrendSection.visible, onValueChange: changeVisibilityHandler }),
                React.createElement("span", null, dictionary.regressionTrend.sections[regressionTrendSection.type]))),
        React.createElement(LineStyleControl, { value: regressionTrendSection.line, onValueChange: changeLineStyleHandler, parentEventTarget: parentEventTarget, noGap: true, noGapItems: true, ...props })));
});
