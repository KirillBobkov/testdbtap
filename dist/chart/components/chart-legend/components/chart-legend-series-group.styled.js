import styled from 'styled-components';
import { ChartLegendStudiesItemControlsStyled } from './chart-legend-studies.styled';
export const ChartLegendGroupWrapperStyled = styled.div.withConfig({ displayName: "ChartLegendGroupWrapperStyled" }) `
	margin-top: var(--spacer-3);
	font-family: var(--font-main-semibold);
	&:hover {
		${ChartLegendStudiesItemControlsStyled} {
			visibility: visible;
		}
	}
`;
export const ChartLegendGroupTitleStyled = styled.div.withConfig({ displayName: "ChartLegendGroupTitleStyled" }) `
	color: var(--databox-text-disabled);
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: inherit;
	line-height: var(--line-height-m-px);
	pointer-events: visible;
`;
export const ChartLegendTitleLabelStyled = styled.div.withConfig({ displayName: "ChartLegendTitleLabelStyled" }) `
	font-family: var(--font-main-semibold);
`;
export const ChartLegendTitleSettingsStyled = styled.div.withConfig({ displayName: "ChartLegendTitleSettingsStyled" }) `
	position: relative;
	display: flex;
	align-items: center;
	margin-left: var(--spacer-2);
`;
