import React, { forwardRef, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { IndicatorItemDraggable } from '../../indicator-list/indicator-item-draggable.component';
import { IndicatorListItem } from '../../indicator-list/indicator-list-item.component';
import { ListItemStyled } from '../studies-settings-content.styled';
import { DxScriptStudyItem } from './dxscript-study-item.component';
import { createKeyDownHandler } from '../../../../../../../chart-kit/utils/keyDownHandler';
import { A11Y_DXSCRIPT_STUDY_LOCKED_DESC_ID, A11Y_DXSCRIPT_STUDY_DESC_ID, A11Y_STUDY_DESC_ID, } from '../../../../../../../chart-kit/accessibility/use-a11y-descriptions';
import { TEST_IDS } from '../../../../../../../config/e2e/test-ids';
export const AvailableStudyItem = memo(forwardRef((props, ref) => {
    const { index, study, isActive, portal, studyTitle, handleSelectStudy, handleAddStudy, onEditScript, onDeleteScript, isDragging, } = props;
    const [isActiveIcons, setActiveIcons] = useState(false);
    const focusInHandler = useCallback(() => setActiveIcons(true), []);
    const focusOutHandler = useCallback(() => setActiveIcons(false), []);
    const editKeyDownHandler = useCallback((e) => {
        e.preventDefault();
        onEditScript(study.id);
    }, [onEditScript, study.id]);
    //@doc-tags shortcut
    const keyDownHandler = useMemo(() => {
        if (study.type === 'dxScript') {
            return createKeyDownHandler(['Delete', () => !study.locked && onDeleteScript(study.id)], ['KeyO', editKeyDownHandler, { ctrlKey: true }], ['Enter', () => handleAddStudy(study.id, study.uuid)]);
        }
        else {
            return createKeyDownHandler(['Enter', () => handleAddStudy(study.id, study.uuid)]);
        }
    }, [study.type, study.locked, study.id, study.uuid, editKeyDownHandler, onDeleteScript, handleAddStudy]);
    const ariaDescribedBy = useMemo(() => (study.type === 'dxScript'
        ? study.locked
            ? A11Y_DXSCRIPT_STUDY_LOCKED_DESC_ID
            : A11Y_DXSCRIPT_STUDY_DESC_ID
        : '') +
        '' +
        A11Y_STUDY_DESC_ID, [study.locked, study.type]);
    useEffect(() => {
        setActiveIcons(false);
    }, [isDragging]);
    return (React.createElement(Draggable, { key: study.uuid, draggableId: study.uuid, index: index }, (provided, snapshot) => (React.createElement(React.Fragment, null,
        React.createElement(IndicatorItemDraggable, { ariaDescribedBy: ariaDescribedBy, testId: TEST_IDS.indicator_item_left, provided: provided, snapshot: snapshot, onKeyDown: keyDownHandler, focusIn: focusInHandler, focusOut: focusOutHandler, portal: portal, transform: false }, study.type === 'dxScript' ? (React.createElement(DxScriptStudyItem, { ...props, isActiveIcons: isActiveIcons, snapshot: snapshot, ref: ref })) : (React.createElement(IndicatorListItem, { id: study.id, uuid: study.uuid, key: study.uuid, title: studyTitle, type: study.type, description: study.description, link: study.link, active: isActive && !snapshot.isDragging, overlaying: study.overlaying, length: study.lines.length, onClick: handleSelectStudy, onAddStudy: handleAddStudy, addStudyButtonEnabled: props.addStudyButtonEnabled, ref: ref, isActiveIcons: isActiveIcons, tooltipAvailable: true }))),
        snapshot.isDragging && (React.createElement(ListItemStyled, null,
            React.createElement(IndicatorListItem, { id: study.id, uuid: study.uuid, key: study.uuid, title: studyTitle, description: study.description, type: study.type, overlaying: study.overlaying, length: study.lines.length, onClick: handleSelectStudy, ref: ref })))))));
}));
