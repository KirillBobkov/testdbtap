import * as React from 'react';
import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { pipe } from 'fp-ts/function';
import { WrapperStyled } from './studies-settings-content.styled';
import { shortenStudiesNames } from './shorten-studies-names';
import { array as arrayF } from 'fp-ts';
import { StudiesSettingsLeftSection } from './studies-settings-left-section.component';
import { StudiesSettingsRightSection } from './studies-settings-right-section.component';
import { filterListByProperties } from '../../../../../../utils/filter-list-by-properties';
const adaptiveBreakpointWidth = 800;
export const StudiesSettingsContent = memo(props => {
    const [portal, setPortal] = useState(undefined);
    // uuid describes selected study in RIGHT section (uuid because there could be added multiple studies of the same type)
    const [currentStudySettingsUUID, setCurrentStudySettingsUUID] = useState(props.selectedStudySettingsUUID);
    // id describes selected study in LEFT section (only one study of one type is in available list - that's why id is enough)
    const [currentSelectedStudyId, setCurrentSelectedStudyId] = useState('');
    const [filterString, setFilterString] = useState('');
    const [windowWidth, setWindowWidth] = useState(1920);
    const [isDragging, setIsDragging] = useState(false);
    const studies = useMemo(() => pipe(props.studies, 
    // if max studies count is reached don't render available studies
    arrayF.filter(_ => props.maxCountSelected > props.addedStudies.length), list => filterListByProperties(list, filterString, [
        { path: ['title'], filterByCapitalLetters: true },
    ])), [filterString, props.addedStudies, props.maxCountSelected, props.studies]);
    const handleWindowResize = useCallback(() => setWindowWidth(window.innerWidth), []);
    useLayoutEffect(() => {
        handleWindowResize();
        const _portal = document.createElement('div');
        _portal.setAttribute('class', 'test');
        document.body.appendChild(_portal);
        setPortal(_portal);
        return () => {
            handleWindowResize();
            _portal.remove();
        };
    }, [handleWindowResize]);
    useEffect(() => setCurrentStudySettingsUUID(props.selectedStudySettingsUUID), [props.selectedStudySettingsUUID]);
    const handleTextFilterChange = useCallback((value) => setFilterString(value || ''), []);
    const getStudyTitle = useCallback((title) => props.isMobile || windowWidth < adaptiveBreakpointWidth ? shortenStudiesNames(title) : title, [props.isMobile, windowWidth]);
    const handleSelectStudy = useCallback((id) => {
        setCurrentSelectedStudyId(id);
        setCurrentStudySettingsUUID('');
    }, []);
    const handleSelectStudySettings = useCallback((id, uuid) => {
        setCurrentSelectedStudyId('');
        setCurrentStudySettingsUUID(uuid);
    }, []);
    const handleAddStudy = useCallback((id, uuid, insertIndex) => {
        props.onAddStudy(id, insertIndex);
        setCurrentSelectedStudyId('');
        setCurrentStudySettingsUUID(uuid);
    }, [props]);
    const handleRemoveStudy = useCallback((uuid) => {
        props.onRemoveStudy(uuid);
        if (currentStudySettingsUUID === uuid) {
            setCurrentStudySettingsUUID('');
        }
    }, [currentStudySettingsUUID, props]);
    const handleDragStart = useCallback((initial) => {
        const { source } = initial;
        switch (source.droppableId) {
            // we're about to delete study in this case
            case 'addedStudies':
                // [LEFT SECTION] <- [RIGHT SECTION]
                setIsDragging(true);
                setCurrentStudySettingsUUID(props.addedStudies[source.index].uuid);
                break;
            // we're about to add study in this case
            case 'studies':
                // [LEFT SECTION] -> [RIGHT SECTION]
                setIsDragging(true);
                setCurrentSelectedStudyId(studies[source.index].id);
                break;
        }
    }, [props.addedStudies, studies]);
    const handleDragEnd = useCallback((result) => {
        const { source, destination } = result;
        if (destination) {
            if (source.droppableId === destination.droppableId && source.droppableId !== 'studies') {
                props.onReorderStudies(source.index, destination.index);
            }
            else if (source.droppableId !== destination.droppableId) {
                switch (destination.droppableId) {
                    case 'addedStudies': {
                        // [LEFT SECTION] -> [RIGHT SECTION]
                        handleAddStudy(currentSelectedStudyId, props.studies[destination.index].uuid, destination.index);
                        break;
                    }
                    case 'studies': {
                        // [LEFT SECTION] <- [RIGHT SECTION]
                        handleRemoveStudy(props.addedStudies[source.index].uuid);
                        break;
                    }
                }
            }
        }
        setIsDragging(false);
    }, [currentSelectedStudyId, handleAddStudy, handleRemoveStudy, props]);
    return portal ? (React.createElement(DragDropContext, { dragHandleUsageInstructions: ' ', onDragEnd: handleDragEnd, onDragStart: handleDragStart },
        React.createElement(WrapperStyled, null,
            React.createElement(StudiesSettingsLeftSection, { ...props, isDragging: isDragging, filterString: filterString, handleTextFilterChange: handleTextFilterChange, handleSelectStudy: handleSelectStudy, handleAddStudy: handleAddStudy, portal: portal, currentSelectedStudyId: currentSelectedStudyId, getStudyTitle: getStudyTitle, studies: studies }),
            React.createElement(StudiesSettingsRightSection, { ...props, isDragging: isDragging, currentStudySettingsUUID: currentStudySettingsUUID, handleRemoveStudy: handleRemoveStudy, handleSelectStudySettings: handleSelectStudySettings, portal: portal, getStudyTitle: getStudyTitle, studies: studies })))) : null;
});
