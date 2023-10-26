import * as React from 'react';
import { memo, useContext, useMemo, useRef } from 'react';
import { AddedListStyled, DeleteButtonStyled, RightSectionStyled, RightSectionWrapperStyled, SettingsSectionStyled, } from './studies-settings-content.styled';
import { IndicatorListSection } from '../indicator-list/indicator-list-section.component';
import { Droppable } from 'react-beautiful-dnd';
import { pipe } from 'fp-ts/function';
import { AddedStudyItem } from './items/added-study-item.component';
import { StudySettings } from '../study-settings/study-settings.component';
import { getStudyByUUID } from '../../studies-settings.model';
import { Scrollable } from '../../../../../../chart-kit/Scrollable/Scrollable';
import { useA11yListboxArrowsFocusController } from '../../../../../../chart-kit/accessibility/use-a11y-listbox-arrows-focus-controller';
import { array, option } from 'fp-ts';
import { MultiChartComponentContext } from '../../../../multi-chart/multi-chart-context';
import { identity } from 'fp-ts/function';
export const StudiesSettingsRightSection = memo((props) => {
    const { isDragging, palette, portal, addedStudies, studies, onEditScript, handleRemoveStudy, handleSelectStudySettings, onChangeStudySettings, getStudyTitle, currentStudySettingsUUID, localization, } = props;
    const { keyboardModeEnabled } = useContext(MultiChartComponentContext);
    const DeleteAllButton = useMemo(() => (React.createElement(DeleteButtonStyled, { onClick: props.onDeleteAll, isFlat: true }, props.localization.studiesPopup.deleteAll)), [props.localization.studiesPopup.deleteAll, props.onDeleteAll]);
    const currentSettings = useMemo(() => pipe(getStudyByUUID(addedStudies, currentStudySettingsUUID), option.fold(() => null, settings => settings)), [addedStudies, currentStudySettingsUUID]);
    const listRef = useRef(null);
    const listboxContent = useMemo(() => {
        return (React.createElement(Scrollable, null,
            React.createElement(AddedListStyled, { ref: listRef, "aria-label": localization.studiesPopup.a11y_addedStudiesList }, props.addedStudies.map((study, index) => {
                const studyTitle = getStudyTitle(study.title);
                const isActive = study.uuid === currentStudySettingsUUID;
                const sequenceOption = array.sequence(option.Applicative);
                const params = pipe(sequenceOption(study.parameters.map(({ value }) => value)), option.map(arr => arr.join(', ')), option.fold(() => undefined, identity));
                return (React.createElement(AddedStudyItem, { study: study, key: study.uuid, index: index, isActive: isActive, appendix: params, studyTitle: studyTitle, portal: portal, isMobile: props.isMobile, onRemoveStudy: handleRemoveStudy, onSelectStudySettings: handleSelectStudySettings, localization: localization }));
            }))));
    }, [
        currentStudySettingsUUID,
        getStudyTitle,
        handleRemoveStudy,
        handleSelectStudySettings,
        portal,
        props.addedStudies,
        props.isMobile,
        localization,
    ]);
    useA11yListboxArrowsFocusController({
        wrapperRef: listRef,
        childrenSelector: 'li',
        direction: 'vertical',
        deps: [listboxContent], // droppable will re-create the list, we need to react on list changes
    });
    return (React.createElement(RightSectionWrapperStyled, null,
        React.createElement(Scrollable, null,
            React.createElement(RightSectionStyled, { dragging: isDragging, isMobile: props.isMobile },
                React.createElement(IndicatorListSection, { title: props.localization.studiesPopup.addedStudies, headingId: "added_studies_list", actionButton: DeleteAllButton },
                    React.createElement(Droppable, { droppableId: "addedStudies" }, provided => (React.createElement("div", { ref: provided.innerRef },
                        React.createElement(React.Fragment, null,
                            listboxContent,
                            provided.placeholder))))),
                React.createElement(SettingsSectionStyled, { role: "group", "aria-labelledby": "study_settings" }, currentSettings && (React.createElement(StudySettings, { studies: studies, palette: palette, studySettings: currentSettings, onChange: onChangeStudySettings, localization: props.localization, onEditScript: onEditScript, dxScriptEnabled: props.dxScriptEnabled, iconsConfig: props.iconsConfig, keyboardMode: keyboardModeEnabled })))))));
});
