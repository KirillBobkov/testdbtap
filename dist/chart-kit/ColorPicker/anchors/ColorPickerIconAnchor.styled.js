import styled from 'styled-components';
import { Button } from '../../Button/Button.component';
import { IconWrapper } from '../../IconWrapper/IconWrapper.component';
export const ColorPickerButtonContentStyled = styled.div.withConfig({ displayName: "ColorPickerButtonContentStyled" }) `
	z-index: 1;
	background-color: ${props => props.color};
`;
export const ColorPickerButtonTextStyled = styled(Button).withConfig({ displayName: "ColorPickerButtonTextStyled" }) `
	position: relative;
	display: flex;
	align-items: center;
	width: 30px;
	height: 24px;
	min-width: 24px;
	max-width: 24px;
	padding: 0;
	background-color: transparent;

	&:hover {
		background: var(--dropdown-list_item-hovered-bg);
	}
`;
export const ColorPickerWrapperTextStyled = styled.div.withConfig({ displayName: "ColorPickerWrapperTextStyled" }) `
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: -2px;
	transform: translateY(2px);
	fill: none;
`;
export const ColorPickerButtonAnchorStyled = styled.div.withConfig({ displayName: "ColorPickerButtonAnchorStyled" }) ``;
export const ColorPickerTextButtonContentStyled = styled.div.withConfig({ displayName: "ColorPickerTextButtonContentStyled" }) `
	height: 3px;
	width: 16px;
	margin-top: 3px;
	background-color: ${props => props.color};
`;
export const ColorPickerIconWrapperStyled = styled(IconWrapper).withConfig({ displayName: "ColorPickerIconWrapperStyled" }) `
	svg > path {
		stroke: var(--icon-primary-default-bg);
	}
`;
