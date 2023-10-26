import React, { memo, useCallback, useContext, useMemo } from 'react';
import { A11Y_DRAWINGS_SIDEBAR_BUTTON_DESC_ID } from '../../../../chart-kit/accessibility/use-a11y-descriptions';
import { IconWrapper } from '../../../../chart-kit/IconWrapper/IconWrapper.component';
import { createKeyDownHandler } from '../../../../chart-kit/utils/keyDownHandler';
import { TEST_IDS } from '../../../../config/e2e/test-ids';
import { IconsOverridingContext } from '../../../../utils/icons-overriding-context';
import { getIconByDrawingType } from '../../drawings/drawings-selector/getIconByDrawingType';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
import { AddToFavoriteButtonStyled, DrawingsSidebarButtonWithTooltipStyled, RemoveFromFavoriteButtonStyled, } from './chart-drawings-sidebar-drawing.styled';
export const DrawingsSidebarDrawing = memo(props => {
    const { type, active = false, disabled = false, expanded, favorite = false, showFavoritesOnHoverOnly = false, onSelect, onAddToFavorites, onRemoveFromFavorites, onMouseEnter, } = props;
    const iconsConfig = useContext(IconsOverridingContext);
    const { localization } = useContext(MultiChartComponentContext);
    const onSelectHandler = useCallback(() => onSelect(type), [type, onSelect]);
    const onAddToFavoritesHandler = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        onAddToFavorites?.(type);
    }, [type, onAddToFavorites]);
    const onRemoveFromFavoritesHandler = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        onRemoveFromFavorites?.(type);
    }, [type, onRemoveFromFavorites]);
    const onKeyDownHandler = useMemo(() => createKeyDownHandler([
        'KeyD',
        (e) => (favorite ? onRemoveFromFavoritesHandler(e) : onAddToFavoritesHandler(e)),
        { ctrlKey: true },
    ]), [onRemoveFromFavoritesHandler, onAddToFavoritesHandler, favorite]);
    const drawingIcon = useMemo(() => getIconByDrawingType(type, iconsConfig), [type, iconsConfig]);
    const favoriteIcon = useMemo(() => {
        return React.createElement(IconWrapper, null, iconsConfig.drawings.settingsToolbar.favorite);
    }, [iconsConfig.drawings.settingsToolbar.favorite]);
    const notAFavoriteIcon = useMemo(() => {
        return React.createElement(IconWrapper, null, iconsConfig.drawings.settingsToolbar.notAFavorite);
    }, [iconsConfig.drawings.settingsToolbar.notAFavorite]);
    return (React.createElement(DrawingsSidebarButtonWithTooltipStyled, { "aria-describedby": A11Y_DRAWINGS_SIDEBAR_BUTTON_DESC_ID, testId: TEST_IDS.sidebar_drawing_item, isActive: active, expanded: expanded, disabled: disabled, icon: drawingIcon, label: localization.drawings.types[type], disableTooltip: expanded, showFavoritesOnHoverOnly: showFavoritesOnHoverOnly, onKeyDown: onKeyDownHandler, onClick: onSelectHandler, onMouseEnter: onMouseEnter }, expanded ? (favorite ? (React.createElement(RemoveFromFavoriteButtonStyled, { "aria-hidden": true, disabled: disabled, role: "button", onClick: onRemoveFromFavoritesHandler, tabIndex: -1 }, favoriteIcon)) : (React.createElement(AddToFavoriteButtonStyled, { "aria-hidden": true, disabled: disabled, role: "button", onClick: onAddToFavoritesHandler, tabIndex: -1 }, notAFavoriteIcon))) : null));
});
