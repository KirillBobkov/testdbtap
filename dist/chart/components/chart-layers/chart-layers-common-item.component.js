import React, { memo, useCallback, useContext, useMemo, useState, useRef, } from 'react';
import { IconWrapper } from '../../../chart-kit/IconWrapper/IconWrapper.component';
import { IconsOverridingContext } from '../../../utils/icons-overriding-context';
import { ChartLayersCommonItemControlsStyled, ChartLayersCommonItemStyled, ChartLayersCommonItemContentStyled, ChartLayersCommonItemButtonStyled, } from './chart-layers-common-item.styled';
import { MultiChartComponentContext } from '../multi-chart/multi-chart-context';
export const ChartLayersCommonItem = memo((props) => {
    const { children, testId, toggleLocked, toggleVisibility, id, locked = false, visible = true, className, onClickHandle, isSelected, ...rest } = props;
    const layerItemRef = useRef(null);
    const iconsConfig = useContext(IconsOverridingContext);
    const { localization } = useContext(MultiChartComponentContext);
    const [isHovered, setIsHovered] = useState(false);
    const onMouseEnterHandler = useCallback(() => {
        setIsHovered(true);
    }, []);
    const onMouseLeaveHandler = useCallback(() => {
        setIsHovered(false);
    }, []);
    // Group has visual selection with Accordion styles
    const isCssSelectionNeeded = useMemo(() => id.includes('group') ? false : isSelected, [isSelected]);
    const onClick = useCallback((e) => {
        const { ctrlKey, metaKey } = e;
        // focus element so it could be deleted with keyboard
        if (layerItemRef && layerItemRef.current) {
            layerItemRef.current.focus();
        }
        if (ctrlKey || metaKey) {
            onClickHandle((prevSelected) => prevSelected.includes(id) ?
                [...prevSelected.filter(item => item !== id)] : [...prevSelected, id]);
            return;
        }
        onClickHandle((prevSelected) => prevSelected.includes(id) ? [] : [id]);
    }, [onClickHandle, id]);
    const toggleVisibilityHandler = useCallback((e) => {
        e.stopPropagation();
        toggleVisibility(id, !visible);
    }, [id, toggleVisibility, visible]);
    const toggleLockedHandler = useCallback((e) => {
        e.stopPropagation();
        toggleLocked(id, !locked);
    }, [id, toggleLocked, locked]);
    const visibleBtnAriaLabel = useMemo(() => (visible ? localization.chartLayers.a11y_hideLayerItem : localization.chartLayers.a11y_unhideLayerItem), [visible, localization.chartLayers.a11y_hideLayerItem, localization.chartLayers.a11y_unhideLayerItem]);
    const lockedBtnAriaLabel = useMemo(() => (locked ? localization.chartLayers.a11y_lockLayerItem : localization.chartLayers.a11y_unlockLayerItem), [locked, localization.chartLayers.a11y_lockLayerItem, localization.chartLayers.a11y_unlockLayerItem]);
    const visibleBtnIcon = useMemo(() => React.createElement(IconWrapper, null, visible ? iconsConfig.chartLayers.hide : iconsConfig.chartLayers.unhide), [visible, iconsConfig.chartLayers.hide, iconsConfig.chartLayers.unhide]);
    const lockedBtnIcon = useMemo(() => React.createElement(IconWrapper, null, !locked ? iconsConfig.chartLayers.lock : iconsConfig.chartLayers.unlock), [locked, iconsConfig.chartLayers.lock, iconsConfig.chartLayers.unlock]);
    return (React.createElement(ChartLayersCommonItemStyled, { ...rest, ref: layerItemRef, tabIndex: 0, className: className, onMouseEnter: onMouseEnterHandler, onMouseLeave: onMouseLeaveHandler, "data-test-id": testId, onClick: onClick, isHidden: !visible, isSelected: isCssSelectionNeeded },
        React.createElement(ChartLayersCommonItemContentStyled, null, children),
        React.createElement(ChartLayersCommonItemControlsStyled, null,
            React.createElement(ChartLayersCommonItemButtonStyled, { visible: isHovered || !visible, "aria-label": visibleBtnAriaLabel, "aria-hidden": true, tabIndex: -1, icon: visibleBtnIcon, onClick: toggleVisibilityHandler, active: !visible }),
            React.createElement(ChartLayersCommonItemButtonStyled, { visible: isHovered || locked, "aria-label": lockedBtnAriaLabel, "aria-hidden": true, tabIndex: -1, icon: lockedBtnIcon, onClick: toggleLockedHandler, active: locked }))));
});
