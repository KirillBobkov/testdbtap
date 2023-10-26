import styled from 'styled-components';
export const ChartLegendItemContainerStyled = styled.div.withConfig({ displayName: "ChartLegendItemContainerStyled" }) `
	font-size: var(--font-size-m);
	line-height: var(--line-height-m-px);
	color: var(--databox-text-default);
	display: flex;
	justify-content: flex-start;
	font-family: var(--font-main-semibold);
`;
export const ChartLegendItemNameStyled = styled.div.withConfig({ displayName: "ChartLegendItemNameStyled" }) `
	margin-right: var(--spacer-1);
	min-width: 9px;
`;
export const ChartLegendItemValueStyled = styled.div.withConfig({ displayName: "ChartLegendItemValueStyled" }) `
	color: ${props => props.color || `var(--main-text-color)`};
`;
export const ChartLegendItemMainValueStyled = styled(ChartLegendItemValueStyled).withConfig({ displayName: "ChartLegendItemMainValueStyled" }) `
	min-width: 40px; // TODO rework, make depends on instrument max value
	margin-right: var(--spacer-1);
`;
