import React, { forwardRef, memo, useCallback, useContext } from 'react';
import { IndicatorListItem } from '../../indicator-list/indicator-list-item.component';
import { HoldToActionStyled, ScriptDeleteButtonStyled } from '../studies-settings-content.styled';
import { IconWrapper } from '../../../../../../../chart-kit/IconWrapper/IconWrapper.component';
import { MultiChartComponentContext } from '../../../../../multi-chart/multi-chart-context';
import { IconsOverridingContext } from '../../../../../../../utils/icons-overriding-context';
export const DxScriptStudyItem = memo(forwardRef((props, ref) => {
    const { study, isActive, studyTitle, handleSelectStudy, handleAddStudy, onEditScript, onDeleteScript, snapshot, isActiveIcons, } = props;
    const iconsConfig = useContext(IconsOverridingContext);
    const handleEditScript = useCallback(() => onEditScript(study.id), [onEditScript, study.id]);
    const handleDeleteScript = useCallback(() => onDeleteScript(study.id), [onDeleteScript, study.id]);
    const { keyboardModeEnabled } = useContext(MultiChartComponentContext);
    const indicatorListItem = (React.createElement(IndicatorListItem, { ariaLabel: props.localization.studiesPopup.a11y_editScript, id: study.id, uuid: study.uuid, key: study.uuid, title: studyTitle, type: study.type, active: isActive && !snapshot.isDragging, overlaying: study.overlaying, length: study.lines.length, onClick: handleSelectStudy, onAddStudy: handleAddStudy, onEditScript: handleEditScript, addStudyButtonEnabled: props.addStudyButtonEnabled, dxScriptEnabled: props.dxScriptEnabled, ref: ref, isActiveIcons: isActiveIcons, showDeleteButton: !study.locked }));
    return study.locked ? (indicatorListItem) : (React.createElement(HoldToActionStyled, { ariaLabel: props.localization.studiesPopup.a11y_deleteScript, keyboardModeEnabled: keyboardModeEnabled, iconSVGComponent: () => React.createElement(IconWrapper, null, iconsConfig.studies.settings.deleteScript), iconWrapper: ScriptDeleteButtonStyled, onLongPress: handleDeleteScript, delay: 500, overlayText: props.localization.studiesPopup.holdToDelete, showOnHover: isActiveIcons }, indicatorListItem));
}));
