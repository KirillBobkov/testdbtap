import styled from 'styled-components';
export const ChartFooterStyled = styled.div.withConfig({ displayName: "ChartFooterStyled" }) `
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: var(--spacer-1);
	background: var(--main_chart-bg);
`;
export const ChartFooterLeftElementsContainer = styled.div.withConfig({ displayName: "ChartFooterLeftElementsContainer" }) `
	position: relative;
	display: flex;
	width: calc(100% - 168px); // 168px - SwitchAxisButtons + DrawingGroups selector width

	@media (max-width: 480px) {
		width: calc(100% - 108px); // 108px - SwitchAxisButtons width + DrawingGroups selector width, mobile
	}
`;
export const ChartFooterRightElementsContainer = styled.div.withConfig({ displayName: "ChartFooterRightElementsContainer" }) `
	display: flex;
`;
