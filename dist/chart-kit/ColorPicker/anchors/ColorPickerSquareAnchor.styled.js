import styled from 'styled-components';
import { Button } from '../../Button/Button.component';
import { IconWrapperStyled } from '../../IconWrapper/IconWrapper.styled';
export const ColorPickerSquareButtonContentStyled = styled.div.withConfig({ displayName: "ColorPickerSquareButtonContentStyled" }) `
	position: relative;
	height: 20px;
	z-index: 2;
	background-color: ${props => props.color};
	border-radius: 4px;
`;
export const ColorPickerSquareButtonStyled = styled(Button).withConfig({ displayName: "ColorPickerSquareButtonStyled" }) `
	position: relative;
	width: 20px;
	height: 21px;
	min-width: 20px;
	padding: 0;

	&:hover {
		background: var(--dropdown-list_item-hovered-bg);
	}

	${IconWrapperStyled} {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		border-radius: 4px;
	}
`;
export const ColorPickerButtonAnchorStyled = styled.div.withConfig({ displayName: "ColorPickerButtonAnchorStyled" }) `
	width: 20px;
	height: 20px;
`;
