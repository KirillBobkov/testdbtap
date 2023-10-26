import styled from 'styled-components';
import { ChartLegendItemContainerStyled } from './components/chart-legend-item.styled';
export const ChartLegendContainerStyled = styled.div.withConfig({ displayName: "ChartLegendContainerStyled" }) `
	font-size: var(--font-size-m);
	padding-left: var(--spacer-1);
	display: flex;
	flex-direction: column;
	color: var(--databox-text-default);
	background: transparent;
	user-select: none;
`;
export const ChartLegendHorizontalContainerStyled = styled.div.withConfig({ displayName: "ChartLegendHorizontalContainerStyled" }) `
	display: flex;
	justify-content: flex-start;
	margin-bottom: var(--spacer-1);
`;
export const ChartLegendFlowContainerStyled = styled.div.withConfig({ displayName: "ChartLegendFlowContainerStyled" }) `
	${ChartLegendItemContainerStyled} {
		color: var(--main_chart-label-text);
	}
	position: absolute;
	padding-left: var(--spacer-1);
	z-index: 1;
	font-size: var(--font-size-m);
`;
export const ChartLegendSeparateVolumeStyled = styled.div.withConfig({ displayName: "ChartLegendSeparateVolumeStyled" }) `
	padding-left: var(--spacer-1);
	background-color: var(--databox-bg);
`;
