import React, { forwardRef, memo, useContext } from 'react';
import { TEST_IDS } from '../../../../config/e2e/test-ids';
import { IconsOverridingContext } from '../../../../utils/icons-overriding-context';
import { DrawingGroupsAnchorStyled } from './drawing-groups-anchor.styled';
import { ChartReactAppContext } from '../../../defaults';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
export const DrawingGroupsAnchor = memo(forwardRef((props, ref) => {
    const { onClick, ...rest } = props;
    const iconsConfig = useContext(IconsOverridingContext);
    const { isMobile } = useContext(ChartReactAppContext);
    const { localization } = useContext(MultiChartComponentContext);
    const anchorWidths = getAnchorWidths(isMobile);
    return (React.createElement(DrawingGroupsAnchorStyled, { ...rest, ariaLabel: localization.drawingGroups.a11y_drawingGroupsAnchor, testId: TEST_IDS.drawing_groups_anchor, onClick: onClick, ref: ref, caretIcon: iconsConfig.selectBox.arrow, anchorMinWidth: anchorWidths.anchorMinWidth, anchorMaxWidth: anchorWidths.anchorMaxWidth, textWidth: anchorWidths.textWidth }));
}));
const getAnchorWidths = (isMobile) => ({
    anchorMinWidth: isMobile ? '40px' : '100px',
    anchorMaxWidth: isMobile ? '40px' : '160px',
    textWidth: isMobile ? '20px' : 'auto',
});
