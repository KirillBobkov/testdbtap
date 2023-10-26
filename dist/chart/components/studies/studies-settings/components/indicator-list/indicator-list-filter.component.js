import * as React from 'react';
import { memo, useContext } from 'react';
import { IndicatorListFilterContainerStyled, IndicatorListInputStyled, IndicatorAddScriptButtonStyled, } from './indicator-list-filter.styled';
import { IconWrapper } from '../../../../../../chart-kit/IconWrapper/IconWrapper.component';
import { ChartReactAppContext } from '../../../../../defaults';
import { IconsOverridingContext } from '../../../../../../utils/icons-overriding-context';
export const IndicatorListFilter = memo(({ onCreateNewScript, localization, value, handleTextFilterChange, dxScriptEnabled }) => {
    const { isMobile } = useContext(ChartReactAppContext);
    const iconsConfig = useContext(IconsOverridingContext);
    return (React.createElement(IndicatorListFilterContainerStyled, null,
        React.createElement(IndicatorListInputStyled, { placeholder: localization.studiesPopup.filter, value: value, autofocus: true, onValueChange: handleTextFilterChange }),
        !isMobile && dxScriptEnabled ? (React.createElement(IndicatorAddScriptButtonStyled, { "aria-label": localization.studiesPopup.a11y_openScript, icon: React.createElement(IconWrapper, { width: 24, height: 24 }, iconsConfig.indicatorList.add), onClick: onCreateNewScript })) : null));
});
