import React, { memo, useContext } from 'react';
import { IconWrapper } from '../../../../chart-kit/IconWrapper/IconWrapper.component';
import { TEST_IDS } from '../../../../config/e2e/test-ids';
import { IconsOverridingContext } from '../../../../utils/icons-overriding-context';
import { ChartToolbarButtonWithTooltip } from '../../chart-toolbar/chart-toolbar-button-with-tooltip.component';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
import { StudiesSettingsButtonStyled } from './studies-settings.styled';
import { useStudiesProps } from './useStudiesProps';
import { StudiesSettingsPopup } from './studies-settings-popup.lazy-component';
export const StudiesSettings = memo((props) => {
    const { Button, CodeEditorContainer, ...popupProps } = props;
    const iconsConfig = useContext(IconsOverridingContext);
    const { localization } = useContext(MultiChartComponentContext);
    const ariaLabel = localization.toolbar.a11y_buttons.a11y_studies_popup_button;
    const { onClose, onOpen, settingsBtnRef, isOpened } = useStudiesProps(popupProps, '');
    return (React.createElement(React.Fragment, null,
        Button ? (React.createElement(StudiesSettingsButtonStyled, { ref: settingsBtnRef, onClick: onOpen, "aria-label": ariaLabel })) : (React.createElement(ChartToolbarButtonWithTooltip, { ref: settingsBtnRef, isActive: isOpened, icon: React.createElement(IconWrapper, null, iconsConfig.toolbar.studiesSettings), onClick: onOpen, testId: TEST_IDS.button_studies, ariaLabel: ariaLabel, label: localization.toolbar.tooltip.studies_popup_button, disableTooltip: isOpened })),
        React.createElement(StudiesSettingsPopup, { ...popupProps, isOpened: isOpened, onClose: onClose, anchorRef: settingsBtnRef }),
        React.createElement(CodeEditorContainer, null)));
});
