import * as React from 'react';
import { fromNullable, isNone, isSome } from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import { option } from 'fp-ts';
import { ChartSettingsFieldContainerStyled, ChartSettingsFieldHintStyled, ChartSettingsFieldControlStyled, ChartSettingsFieldLabelStyled, } from './chart-settings-field.styled';
import { memo } from 'react';
export const ChartSettingsField = memo(props => {
    const { isDisabled, isSubfield, align = 'left', isSecondary = false, label, children, className, id, preventCheck = false, testId, } = props;
    const hint = fromNullable(props.hint);
    const renderLabel = (React.createElement(ChartSettingsFieldLabelStyled, { align: isNone(hint) && align === 'right', secondary: isSecondary, id: id, isDisabled: isDisabled, hint: isSome(hint) }, label));
    const renderChildren = (React.createElement(ChartSettingsFieldControlStyled, { controlsCount: React.Children.count(children) }, children));
    const preventClickHandler = React.useCallback(e => preventCheck && e.preventDefault(), [preventCheck]);
    return (React.createElement(ChartSettingsFieldContainerStyled, { "data-test-id": testId, className: className, disabled: isDisabled, subfield: isSubfield, align: align, onClick: preventClickHandler },
        isSome(hint) && renderLabel,
        align === 'left' ? (React.createElement(React.Fragment, null,
            renderChildren,
            isNone(hint) && renderLabel)) : (React.createElement(React.Fragment, null,
            isNone(hint) && renderLabel,
            renderChildren)),
        pipe(hint, option.fold(() => null, hint => React.createElement(ChartSettingsFieldHintStyled, null, hint)))));
});
