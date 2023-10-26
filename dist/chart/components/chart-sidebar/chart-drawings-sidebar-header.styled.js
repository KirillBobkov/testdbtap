import styled from 'styled-components';
import { ButtonIcon } from '../../../chart-kit/Button/ButtonIcon.component';
export const DrawingsSidebarToggleButtonStyled = styled(ButtonIcon).withConfig({ displayName: "DrawingsSidebarToggleButtonStyled" }) `
	width: 24px;
	height: 24px;
	max-height: 24px;
	max-width: 24px;
	min-width: 24px;
	padding: 0;
	margin-left: 0;
	border-radius: 0;
	background-color: var(--main_chart-bg);

	&:hover {
		background-color: var(--dropdown-list_item-hovered-bg);
		border-radius: 4px;
	}

	div {
		display: flex;
		align-items: center;
		justify-content: center;
	}
`;
export const DrawingsSidebarHeaderLabelStyled = styled.div.withConfig({ displayName: "DrawingsSidebarHeaderLabelStyled" }) `
	display: flex;
	flex-grow: 1;
	padding-right: var(--spacer-8);
	align-items: center;
	justify-content: center;
	font-size: var(--font-size-m);
	line-height: var(--line-height-m);
	font-family: var(--font-main-semibold);
	font-weight: 600;
`;
export const DrawingsSidebarHeaderStyled = styled.div.withConfig({ displayName: "DrawingsSidebarHeaderStyled" }) `
	display: flex;
	height: 24px;
	padding: var(--spacer-1) var(--spacer-05);
	box-sizing: unset !important;
	color: var(--dropdown-list_item-default-text);

	&:hover {
		cursor: default;
	}

	${DrawingsSidebarToggleButtonStyled} {
		${props => props.expanded && 'transform: rotateY(180deg)'};
	}

	${DrawingsSidebarHeaderLabelStyled} {
		${props => !props.expanded && 'display: none'};
	}
`;
