import React, { forwardRef, memo, useCallback, useContext, useRef, useState } from 'react';
import { IndicatorListItemAddIconStyled, IndicatorListItemContainerStyled, IndicatorListItemDescriptionStyled, IndicatorListItemDxIconStyled, IndicatorListItemIconDownStyled, IndicatorListItemIconStyled, IndicatorListItemIconUpStyled, IndicatorListItemInfoStyled, IndicatorListItemSelectIconStyled, IndicatorListItemTitleStyled, IndicatorListItemTooltipIconStyled, IndicatorListItemInfoHeader, IndicatorListItemInfoText, IndicatorListItemIconsContainer, IndicatorListItemDocsLinkStyled, IndicatorListItemInfoWrapper, IndicatorListItemInfoPopover, } from './indicator-list-item.styled';
import { getParsedName } from '../../../../../../utils/script-title.utils';
import { IconWrapper } from '../../../../../../chart-kit/IconWrapper/IconWrapper.component';
import { ChartReactAppContext } from '../../../../../defaults';
import { MultiChartComponentContext } from '../../../../multi-chart/multi-chart-context';
import { Scrollable } from '../../../../../../chart-kit/Scrollable/Scrollable';
import { IconsOverridingContext } from '../../../../../../utils/icons-overriding-context';
const fontParams = 'normal normal 400 14px Open Sans';
const IndicatorIcon = memo(({ overlaying, type }) => {
    const iconsConfig = useContext(IconsOverridingContext);
    let Icon = (React.createElement(IndicatorListItemIconDownStyled, null,
        React.createElement(IconWrapper, null, iconsConfig.studies.studyUnderlaying)));
    if (type === 'dxScript') {
        Icon = (React.createElement(IndicatorListItemDxIconStyled, null,
            React.createElement(IconWrapper, null, iconsConfig.studies.script.studyScript)));
    }
    else if (overlaying) {
        Icon = (React.createElement(IndicatorListItemIconUpStyled, null,
            React.createElement(IconWrapper, null, iconsConfig.studies.studyOverlaying)));
    }
    return Icon;
});
export const IndicatorListItem = memo(forwardRef((props, ref) => {
    const { id, title, type, description, link, appendix, overlaying, onClick, onAddStudy, active = false, children, className, addStudyButtonEnabled, onEditScript, showDeleteButton, dxScriptEnabled, uuid, isActiveIcons, ariaLabel, tooltipAvailable = false, } = props;
    const { isMobile } = useContext(ChartReactAppContext);
    const iconRef = useRef(null);
    const [isTooltipOpened, setTooltipOpened] = useState(false);
    const iconsConfig = useContext(IconsOverridingContext);
    const { localization } = useContext(MultiChartComponentContext);
    const handleClick = useCallback(() => onClick(id, uuid), [onClick, id, uuid]);
    const handleAddStudy = useCallback(() => onAddStudy?.(id, uuid), [onAddStudy, id, uuid]);
    const handleMouseEnter = () => setTooltipOpened(true);
    const handleMouseLeave = () => setTooltipOpened(false);
    const formatDescription = (description) => description.split('\n').map((str, i) => (React.createElement(React.Fragment, { key: `${str}_${i}` },
        str,
        React.createElement("br", null))));
    return (React.createElement(IndicatorListItemContainerStyled, { className: className, active: active, onClick: handleClick, onDoubleClick: handleAddStudy, ref: ref },
        React.createElement(IndicatorListItemIconStyled, null,
            React.createElement(IndicatorIcon, { type: type, overlaying: overlaying })),
        React.createElement(IndicatorListItemTitleStyled, null, getParsedName(title, fontParams, 200)),
        isActiveIcons && (React.createElement(IndicatorListItemIconsContainer, null,
            addStudyButtonEnabled && (React.createElement(IndicatorListItemAddIconStyled, { onClick: handleAddStudy },
                React.createElement(IconWrapper, { width: 24, height: 24 }, iconsConfig.studies.add))),
            !isMobile && tooltipAvailable && (React.createElement(React.Fragment, null,
                React.createElement(IndicatorListItemTooltipIconStyled, { "aria-describedby": "tooltip-content", hovered: isTooltipOpened, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave },
                    React.createElement("div", { ref: iconRef }, iconsConfig.studies.script.help),
                    React.createElement(IndicatorListItemInfoPopover, { anchorRef: iconRef, position: "right", align: "start", opened: isTooltipOpened },
                        React.createElement(IndicatorListItemInfoStyled, { id: "tooltip-content" },
                            React.createElement(IndicatorListItemInfoHeader, null,
                                React.createElement("span", null, title)),
                            React.createElement(Scrollable, null,
                                React.createElement(IndicatorListItemInfoWrapper, null,
                                    React.createElement(IndicatorListItemInfoText, null, formatDescription(description ?? '')),
                                    link &&
                                        React.createElement(IndicatorListItemDocsLinkStyled, { href: link, target: '_blank' }, localization.studiesPopup.learnMoreLink)))))))),
            !isMobile && dxScriptEnabled && (React.createElement(IndicatorListItemSelectIconStyled, { "aria-label": ariaLabel, tabIndex: -1, "aria-hidden": true, onClick: onEditScript },
                React.createElement(IconWrapper, { width: 24, height: 24 }, iconsConfig.studies.script.edit))),
            showDeleteButton && React.createElement(IndicatorListItemIconStyled, null))),
        children,
        !isMobile && appendix && (React.createElement(IndicatorListItemDescriptionStyled, null, appendix))));
}));
