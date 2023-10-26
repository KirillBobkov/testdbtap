import * as React from 'react';
import { memo, useCallback, useMemo, useState, useContext } from 'react';
import { toType, typeToString } from './chart-type.model';
import { string } from 'fp-ts';
import { TypeAnchor } from './chart-type-anchor.component';
import { getIconByChartType } from './getIconByChartType';
import { ChartTypeDropdownMenuItem } from './chart-type-dropdown.styled';
import { DropdownMenu } from '../../../chart-kit/Menu/dropdown-menu/DropdownMenu.styled';
import { IconsOverridingContext } from '../../../utils/icons-overriding-context';
import { Selectbox } from '../../../chart-kit/Selectbox/Selectbox.component';
import { TEST_IDS } from '../../../config/e2e/test-ids';
import { createKeyDownHandler } from '../../../chart-kit/utils/keyDownHandler';
import { MultiChartComponentContext } from '../multi-chart/multi-chart-context';
import { Popover } from '../../../chart-kit/Popover/Popover.lazy-component';
const SelectboxPopover = (props) => {
    return React.createElement(Popover, { ...props, align: "start", position: "bottom" });
};
export const ChartTypeDropdown = memo(({ selectedType, onTypeSelect, className, chartTypes }) => {
    const { keyboardModeEnabled, localization } = useContext(MultiChartComponentContext);
    const [isOpened, setOpened] = useState(false);
    const iconsConfig = useContext(IconsOverridingContext);
    const renderTypeIcon = useCallback((type) => getIconByChartType(type, iconsConfig), [iconsConfig]);
    const handleTypeToggle = useCallback((isShow) => {
        if (isShow !== undefined) {
            setOpened(isShow);
        }
    }, [setOpened]);
    const handleTypeSelect = useCallback((type) => {
        if (type !== undefined && !Array.isArray(type)) {
            onTypeSelect(toType(type.toString(), localization));
        }
    }, [onTypeSelect, localization]);
    const onKeyDown = useCallback((type) => createKeyDownHandler([
        'Space',
        e => {
            e.preventDefault();
            handleTypeSelect && handleTypeSelect(type);
            setOpened(false);
        },
    ], [
        'Enter',
        e => {
            e.preventDefault();
            handleTypeSelect && handleTypeSelect(type);
            setOpened(false);
        },
    ]), [handleTypeSelect]);
    const currentValue = useMemo(() => typeToString(selectedType, localization), [selectedType, localization]);
    const isTypeActive = useCallback((type) => string.Eq.equals(currentValue, typeToString(type, localization)), [currentValue, localization]);
    return (React.createElement(Selectbox, { className: className, isOpened: isOpened, onToggle: handleTypeToggle, value: currentValue, onValueChange: handleTypeSelect, Anchor: TypeAnchor, Menu: DropdownMenu, Popover: SelectboxPopover, keyboardMode: keyboardModeEnabled, testIdAnchor: TEST_IDS.selectbox_chart_type_anchor, testIdPopover: TEST_IDS.selectbox_chart_type_popover, tabIndex: -1, anchorAriaLabel: localization.toolbar.a11y_buttons.a11y_chart_type_dropdown }, chartTypes.map(type => (React.createElement(ChartTypeDropdownMenuItem, { key: type, value: typeToString(type, localization), isActive: isTypeActive(type), label: typeToString(type, localization), onKeyDown: onKeyDown(typeToString(type, localization)), testId: TEST_IDS.chart_type_dropdown_item, icon: renderTypeIcon(type) })))));
});
