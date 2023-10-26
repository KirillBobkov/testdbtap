import styled from 'styled-components';
import { Button } from '../../Button/Button.component';
export const ColorPickerButtonContentStyled = styled.div.withConfig({ displayName: "ColorPickerButtonContentStyled" }) `
	z-index: 1;
	background-color: ${props => props.color};
`;
export const ColorPickerButtonTextStyled = styled(Button).withConfig({ displayName: "ColorPickerButtonTextStyled" }) `
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
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
	justify-content: center;
	align-items: center;
	fill: none;
	height: 23px;
`;
export const ColorPickerButtonAnchorStyled = styled.div.withConfig({ displayName: "ColorPickerButtonAnchorStyled" }) `
	width: 24px;
	height: 24px;
`;
export const ColorPickerTextIconAnchorStyled = styled.div.withConfig({ displayName: "ColorPickerTextIconAnchorStyled" }) `
	position: relative;
	font-size: 13px;
`;
export const ColorPickerTextButtonContentStyled = styled.div.withConfig({ displayName: "ColorPickerTextButtonContentStyled" }) `
	height: 3px;
	width: 16px;
	transform: translateY(3px);
	background-color: ${props => props.color};
`;
