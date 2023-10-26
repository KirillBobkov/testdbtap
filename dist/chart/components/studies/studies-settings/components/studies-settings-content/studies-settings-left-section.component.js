import * as React from 'react';
import { memo, useMemo, useRef } from 'react';
import { IndicatorListSection } from '../indicator-list/indicator-list-section.component';
import { Droppable } from 'react-beautiful-dnd';
import { EmptyStyled, LeftSectionStyled, StudiesListStyled } from './studies-settings-content.styled';
import { fromArray } from 'fp-ts/NonEmptyArray';
import { fold } from 'fp-ts/Option';
import { AvailableStudyItem } from './items/available-study-item.component';
import { Scrollable } from '../../../../../../chart-kit/Scrollable/Scrollable';
import { StudiesSettingsContentHeader } from './studies-settings-content-header';
import { UL } from '../../../../../../chart-kit/UL/UL';
import { pipe } from 'fp-ts/function';
import { useA11yListboxArrowsFocusController } from '../../../../../../chart-kit/accessibility/use-a11y-listbox-arrows-focus-controller';
const emptyFilterResults = React.createElement(EmptyStyled, null, "No results");
export const StudiesSettingsLeftSection = memo(props => {
    const { filterString, handleTextFilterChange, portal, handleAddStudy, currentSelectedStudyId, handleSelectStudy, studies, localization, isDragging, } = props;
    const listRef = useRef(null);
    const listboxContent = useMemo(() => (React.createElement(UL, { ref: listRef, "aria-label": localization.studiesPopup.a11y_availableStudiesList }, pipe(fromArray(studies), fold(() => emptyFilterResults, studies => (React.createElement(React.Fragment, null, studies.map((study, index) => {
        const studyTitle = props.getStudyTitle(study.title);
        const isActive = study.id === currentSelectedStudyId;
        return (React.createElement(AvailableStudyItem, { key: study.id, localization: localization, onEditScript: props.onEditScript, onDeleteScript: props.onDeleteScript, study: study, index: index, isActive: isActive, portal: portal, studyTitle: studyTitle, handleSelectStudy: handleSelectStudy, handleAddStudy: handleAddStudy, addStudyButtonEnabled: props.addStudyButtonEnabled, dxScriptEnabled: props.dxScriptEnabled, isDragging: isDragging }));
    }))))))), [currentSelectedStudyId, handleAddStudy, handleSelectStudy, portal, props, studies, localization]);
    useA11yListboxArrowsFocusController({
        wrapperRef: listRef,
        childrenSelector: 'li',
        direction: 'vertical',
        deps: [listboxContent, filterString], // droppable will re-create the list, we need to react on list changes
    });
    return (React.createElement(LeftSectionStyled, { isMobile: props.isMobile },
        React.createElement(IndicatorListSection, { ariaLabel: localization.studiesPopup.a11y_availableStudes, header: React.createElement(StudiesSettingsContentHeader, { dxScriptEnabled: props.dxScriptEnabled, filterString: filterString, handleTextFilterChange: handleTextFilterChange, localization: localization, onCreateNewScript: props.onCreateNewScript }) },
            React.createElement(Droppable, { droppableId: "studies" }, provided => (React.createElement(Scrollable, null,
                React.createElement(StudiesListStyled, { ref: provided.innerRef },
                    React.createElement(React.Fragment, null,
                        listboxContent,
                        provided.placeholder))))))));
});
