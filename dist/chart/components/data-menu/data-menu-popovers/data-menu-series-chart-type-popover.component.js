import React, { memo, useCallback, useContext, useMemo, useRef } from 'react';
import { RightClickPopoverMenuStyled } from '../../right-click-menu/right-click-menu.styled';
import { useA11yPopFocusController } from '../../../../chart-kit/accessibility/use-a11y-pop-focus-controller';
import { useA11yModalTabKeyHandler } from '../../../../chart-kit/accessibility/use-a11y-modal-tab-key-handler';
import { ChartTypeDropdownMenuItem } from '../../chart-type/chart-type-dropdown.styled';
import { toType, typeToString } from '../../chart-type/chart-type.model';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
import { string } from 'fp-ts';
import { getIconByChartType } from '../../chart-type/getIconByChartType';
import { IconsOverridingContext } from '../../../../utils/icons-overriding-context';
import { DataMenuPopoverContainerStyled, DataMenuPopoverStyled } from './data-menu-popovers.styled';
export const DataMenuChartTypePopover = memo(props => {
    const { isOpened, onClose, value, seriesChartTypes, onChangeSeriesChartType, anchorRef } = props;
    const { localization } = useContext(MultiChartComponentContext);
    const iconsConfig = useContext(IconsOverridingContext);
    const popoverRef = useRef(null);
    const tabKeyHandler = useA11yModalTabKeyHandler(popoverRef);
    useA11yPopFocusController({
        anchorRef,
        popRef: popoverRef,
    });
    const currentValue = useMemo(() => typeToString(value, localization), [value]);
    const isTypeActive = useCallback((type) => string.Eq.equals(currentValue, typeToString(type, localization)), [currentValue, localization]);
    const renderTypeIcon = useCallback((type) => getIconByChartType(type, iconsConfig), [iconsConfig]);
    const changeTypeHandler = useCallback((value) => {
        onChangeSeriesChartType(toType(`${value}`));
        onClose();
    }, [onChangeSeriesChartType, onClose]);
    return (React.createElement(DataMenuPopoverStyled, { opened: isOpened, onRequestClose: onClose, position: 'right', keyboardMode: true, onTabPress: tabKeyHandler, anchorRef: anchorRef, selectorRef: anchorRef, align: 'start' },
        React.createElement(DataMenuPopoverContainerStyled, { ref: popoverRef },
            React.createElement(RightClickPopoverMenuStyled, { onItemSelect: changeTypeHandler }, seriesChartTypes.map(type => (React.createElement(ChartTypeDropdownMenuItem, { key: type, value: typeToString(type, localization), isActive: isTypeActive(type), label: typeToString(type, localization), icon: renderTypeIcon(type) })))))));
});
