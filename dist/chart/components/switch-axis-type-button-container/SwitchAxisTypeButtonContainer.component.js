import React, { useRef, memo } from 'react';
import { SwitchAxisButtonsContainerStyled } from './SwitchAxisTypeButtonContainer.styled';
import { LogButtonStyled } from './LogButton.styled';
import { PercentButtonStyled } from './PercentButton.styled';
import { IconWrapper } from '../../../chart-kit/IconWrapper/IconWrapper.component';
import { TEST_IDS } from '../../../config/e2e/test-ids';
export const SwitchAxisTypeButtonsContainer = memo(props => {
    const switchAxisRef = useRef(null);
    const { onPercentButtonClick, isPercentButtonActive, onLogButtonClick, isLogButtonActive, localization } = props;
    return (React.createElement(SwitchAxisButtonsContainerStyled, { ref: switchAxisRef, top: props.top + 1.5 },
        React.createElement(PercentButtonStyled, { "aria-label": localization.yAxis.buttons.a11y_percent, isActive: isPercentButtonActive, isExtra: true, onClick: onPercentButtonClick, testId: TEST_IDS.switch_axis_type_button },
            React.createElement(IconWrapper, null, "%")),
        React.createElement(LogButtonStyled, { "aria-label": localization.yAxis.buttons.a11y_logarithmic, testId: TEST_IDS.switch_axis_type_button, isActive: isLogButtonActive, isExtra: true, onClick: onLogButtonClick }, "Log")));
});
