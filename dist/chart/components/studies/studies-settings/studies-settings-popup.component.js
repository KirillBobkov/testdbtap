import * as React from 'react';
import { memo, useContext } from 'react';
import { StudiesSettingsContent } from './components/studies-settings-content/studies-settings-content.component';
import { FooterButtonStyled, StudiesMaxCountStyled, StudiesSaveCancelButtonsWrapper, StudiesSettingsPopupStyled, } from './studies-settings-popup.styled';
import { IconsOverridingContext } from '../../../../utils/icons-overriding-context';
import { TEST_IDS } from '../../../../config/e2e/test-ids';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
import { ChartReactAppContext } from '../../../defaults';
export const StudiesSettingsFooter = memo(props => {
    const { maxCountSelected, addedStudies, onClose } = props;
    const { localization } = useContext(MultiChartComponentContext);
    return (React.createElement(React.Fragment, null,
        React.createElement(StudiesMaxCountStyled, null, addedStudies.length === maxCountSelected &&
            `${maxCountSelected} ${localization.studiesPopup.studiesMax}`),
        React.createElement(StudiesSaveCancelButtonsWrapper, null,
            React.createElement(FooterButtonStyled, { onClick: onClose, isPrimary: true, testId: TEST_IDS.popup_studies_footer_close }, localization.studiesPopup.close))));
});
const StudiesSettingsPopup = memo(props => {
    const { isOpened, studies, maxCountSelected, addedStudies, palette, selectedStudySettingsUUID, onClose, className, onAddedStudy, onRemoveStudy, onChangeStudy, onRemoveAllStudies, onCreateNewScript, onEditScript, onDeleteScript, onReorderStudies, dxScriptEnabled, addStudyButtonEnabled, anchorRef, } = props;
    const minWidthStudiesPopup = window.innerWidth < 1000 ? 100 : 750;
    const defaultSizeStudiesPopup = window.innerWidth > 1000
        ? {
            width: 947,
            height: 523,
        }
        : {
            width: window.innerWidth,
            height: window.innerHeight * 0.8,
        };
    const iconsConfig = useContext(IconsOverridingContext);
    const { keyboardModeEnabled, localization } = useContext(MultiChartComponentContext);
    const footer = React.createElement(StudiesSettingsFooter, { ...props });
    const { isMobile } = useContext(ChartReactAppContext);
    return (React.createElement(StudiesSettingsPopupStyled, { closeBtnAriaLabel: localization.components.popup.closeBtn, anchorRef: anchorRef, isModal: true, header: localization.studiesPopup.editStudies, footer: footer, isOpened: isOpened, isClosable: true, onRequestClose: onClose, className: className, shouldCloseOnClickAway: false, draggable: !isMobile, resizable: !isMobile, scrollable: false, isMobile: isMobile, defaultSize: defaultSizeStudiesPopup, minWidth: minWidthStudiesPopup, keyboardMode: keyboardModeEnabled, testId: TEST_IDS.popup_studies },
        React.createElement(StudiesSettingsContent, { isMobile: isMobile, studies: studies, palette: palette, addedStudies: addedStudies, selectedStudySettingsUUID: selectedStudySettingsUUID, maxCountSelected: maxCountSelected, onAddStudy: onAddedStudy, onRemoveStudy: onRemoveStudy, onChangeStudySettings: onChangeStudy, onDeleteAll: onRemoveAllStudies, localization: localization, onCreateNewScript: onCreateNewScript, onEditScript: onEditScript, onDeleteScript: onDeleteScript, onReorderStudies: onReorderStudies, dxScriptEnabled: dxScriptEnabled, addStudyButtonEnabled: addStudyButtonEnabled, iconsConfig: iconsConfig })));
});
export default StudiesSettingsPopup;
