import styled from 'styled-components';
import { Button } from '../../../../chart-kit/Button/Button.component';
export const ChartLayersHeaderContainer = styled.div.withConfig({ displayName: "ChartLayersHeaderContainer" }) `
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: var(--spacer-1);
	margin-bottom: var(--spacer-05);
	cursor: grab;
	cursor: -moz-grab;
	cursor: -webkit-grab;
	border-bottom: 1px solid var(--dropdown-list_item-divider-bg);

	&:active {
		cursor: grabbing;
		cursor: -moz-grabbing;
		cursor: -webkit-grabbing;
	}
`;
export const ChartLayersHeaderLabel = styled.div.withConfig({ displayName: "ChartLayersHeaderLabel" }) `
	line-height: var(--line-height-m-px);
	padding: var(--spacer-1);
`;
export const CloseButtonStyled = styled(Button).withConfig({ displayName: "CloseButtonStyled" }) `
	display: flex;
	padding: var(--spacer-1);
	height: auto;
	min-width: auto;
	font-family: var(--font-main-semibold);
	font-size: var(--font-size-m);
	line-height: var(--line-height-m-px);
	color: var(--icon-secondary-default-bg);

	&:hover {
		color: var(--icon-secondary-default-bg);
	}
`;
