import styled, { css } from 'styled-components';
import { Button } from '../../Button/Button.component';
import { IconWrapperStyled } from '../../IconWrapper/IconWrapper.styled';
import { isWhite } from '../utils/color-picker-functions';
export const ColorPickerButtonContentStyled = styled.div.withConfig({ displayName: "ColorPickerButtonContentStyled" }) `
	position: relative;
	height: 20px;
	z-index: 2;
	border-radius: 4px;
	background-color: ${props => props.color};
	${props => isWhite(props.color) &&
    css `
			border: 1px solid var(--palette-color-border);
		`};
`;
export const ColorPickerButtonStyled = styled(Button).withConfig({ displayName: "ColorPickerButtonStyled" }) `
	position: relative;
	width: 20px;
	height: 20px;
	min-width: auto;
	padding: 0;
	border-radius: 4px;

	${IconWrapperStyled} {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		border-radius: 4px;
	}

	&:focus {
		box-shadow: 0 0 0 1px var(--button-focus-border);
	}
`;
export const ColorPickerButtonAnchorStyled = styled.div.withConfig({ displayName: "ColorPickerButtonAnchorStyled" }) `
	width: 20px;
	height: 20px;
`;
