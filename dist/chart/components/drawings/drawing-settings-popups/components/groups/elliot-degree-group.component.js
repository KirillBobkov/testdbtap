import React, { useCallback, memo, useState, useMemo } from 'react';
import { Lens } from 'monocle-ts';
import { DrawingsSettingsSelectboxStyled, DrawingsSettingsMenuItemStyled, } from '../../../drawing-settings-section/drawing-settings-common.styled';
import { DrawingSettingsItem } from '../../../drawing-settings-section/drawing-settings-item';
import { DrawingSettingsGroup } from '../../../drawing-settings-section/drawing-settings-group';
import { typedMemo } from '../../../../../../utils/typed-memo';
import { PopupEventTargetConsumer } from '../../../../../../chart-kit/Popup/PopupUI.component';
function ElliotDegreeGroupSettings(props) {
    const { elliotDegreeLens } = useMemo(() => {
        const drawingModelLens = Lens.fromPath();
        const elliotDegreeLens = drawingModelLens(['properties', 'settings', 'degreeType']);
        return {
            elliotDegreeLens,
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { value, onValueChange } = props;
    const drawingProperties = value.properties;
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [value, onValueChange]);
    const updateElliotDegree = useCallback((value) => isElliotDegree(value) && createHandler(elliotDegreeLens, value), [createHandler, elliotDegreeLens]);
    return (React.createElement(PopupEventTargetConsumer, null, eventTarget => (React.createElement(DrawingSettingsGroup, null,
        React.createElement(DrawingSettingsItem, null,
            React.createElement(ElliotDegreeSelectbox, { value: drawingProperties.settings.degreeType, onValueChange: updateElliotDegree, parentEventTarget: eventTarget }))))));
}
export const ElliotDegreeGroup = typedMemo(ElliotDegreeGroupSettings);
//#region ElliotDegreeSelectbox component
const degreeTypes = [
    'Subminutte',
    'Minutte',
    'Minute',
    'Minor',
    'Intermediate',
    'Primary',
    'Cycle',
    'Super Cycle',
    'Grand Super Cycle',
];
const ElliotDegreeSelectbox = memo(props => {
    const { value, onValueChange, ...rest } = props;
    const [isElliottWaveSelectboxOpened, toggleElliottWaveSelectBox] = useState(false);
    const toggleEllioutWaveSelectBoxHanlder = useCallback(() => toggleElliottWaveSelectBox(!isElliottWaveSelectboxOpened), [isElliottWaveSelectboxOpened]);
    const updateElliotDegree = useCallback(onValueChange, [onValueChange]);
    const isActive = useCallback((degree) => value === degree, [value]);
    return (React.createElement(DrawingsSettingsSelectboxStyled, { ...rest, value: value, onValueChange: updateElliotDegree, isOpened: isElliottWaveSelectboxOpened, onToggle: toggleEllioutWaveSelectBoxHanlder }, degreeTypes.map(degreeType => (React.createElement(DrawingsSettingsMenuItemStyled, { key: degreeType, value: degreeType, isActive: isActive(degreeType) }, degreeType)))));
});
function isElliotDegree(value) {
    return (typeof value === 'string' &&
        [
            'Subminutte',
            'Minutte',
            'Minute',
            'Minor',
            'Intermediate',
            'Primary',
            'Cycle',
            'Super Cycle',
            'Grand Super Cycle',
        ].includes(value));
}
//#endregion
