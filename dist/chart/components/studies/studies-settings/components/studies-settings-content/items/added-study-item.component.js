import * as React from 'react';
import { forwardRef, memo, useCallback } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { IndicatorItemDraggable } from '../../indicator-list/indicator-item-draggable.component';
import { IndicatorListItem } from '../../indicator-list/indicator-list-item.component';
import { AddedIndicatorListItemStyled, RemoveButtonStyled } from '../studies-settings-content.styled';
import { IconWrapper } from '../../../../../../../chart-kit/IconWrapper/IconWrapper.component';
import { TEST_IDS } from '../../../../../../../config/e2e/test-ids';
import { IconsOverridingContext } from '../../../../../../../utils/icons-overriding-context';
export const AddedStudyItem = memo(forwardRef((props, ref) => {
    const { index, study, isActive, portal, studyTitle, appendix, onRemoveStudy, isMobile, onSelectStudySettings, localization, } = props;
    const handleRemoveStudy = useCallback(() => onRemoveStudy(study.uuid), [onRemoveStudy, study.uuid]);
    const handleSelectStudySettings = useCallback(() => onSelectStudySettings(study.id, study.uuid), [onSelectStudySettings, study.id, study.uuid]);
    const iconsConfig = React.useContext(IconsOverridingContext);
    const keyDownHandler = useCallback((e) => {
        if (e.key === 'Delete') {
            handleRemoveStudy();
        }
    }, [handleRemoveStudy]);
    return (React.createElement(Draggable, { key: study.uuid, draggableId: `studies-${study.uuid}`, index: index }, (provided, snapshot) => (React.createElement(IndicatorItemDraggable, { focusIn: snapshot.isDragging ? handleSelectStudySettings : undefined, provided: provided, snapshot: snapshot, portal: portal, draggable: true, testId: TEST_IDS.indicator_item_right, onKeyDown: keyDownHandler, transform: true },
        React.createElement(AddedIndicatorListItemStyled, { isMobile: isMobile },
            React.createElement(IndicatorListItem, { id: study.id, uuid: study.uuid, key: study.uuid, title: studyTitle, type: study.type, overlaying: study.overlaying, appendix: appendix, length: study.lines.length, active: isActive, onClick: handleSelectStudySettings, ref: ref })),
        isActive && !snapshot.isDragging && (React.createElement(RemoveButtonStyled, { "aria-label": localization.studiesPopup.a11y_close, isFlat: true, tabIndex: -1, icon: React.createElement(IconWrapper, null, iconsConfig.studies.settings.bigcross), onClick: handleRemoveStudy }))))));
}));
