import React from 'react';
import { memo } from 'react';
import { TEST_IDS } from '../../../config/e2e/test-ids';
import { ChartFooterStyled } from './chart-footer.styled';
export const ChartFooter = memo(({ children }) => {
    return React.createElement(ChartFooterStyled, { "data-test-id": TEST_IDS.chart_footer }, children);
});
