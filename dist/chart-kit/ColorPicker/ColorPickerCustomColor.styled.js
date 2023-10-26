import styled, { css } from 'styled-components';
import { IconWrapperStyled } from '../IconWrapper/IconWrapper.styled';
export const ColorPickerCustomColorWrapperStyled = styled.div.withConfig({ displayName: "ColorPickerCustomColorWrapperStyled" }) `
	position: relative;
	display: flex;
	align-items: center;
	width: 20px;
	height: 20px;
	cursor: pointer;
	box-sizing: border-box;
	overflow: hidden;

	&:hover {
		transform: ${({ isActive }) => (isActive ? 'scale(1.2)' : 'scale(1.1)')};
	}

	${props => props.isActive &&
    css `
			transform: scale(1.2);
			border: 2px solid var(--palette-color-border, #fff);
			padding: 1px;
			background-clip: content-box;
			border-radius: 50%;
		`}
`;
export const ColorPickerCustomColorFill = styled.div.withConfig({ displayName: "ColorPickerCustomColorFill" }) `
	width: 10px;
	height: 100%;
	border-top-left-radius: 15px;
	border-bottom-left-radius: 15px;
	background-color: ${props => props.color};
`;
export const ColorPickerCustomColorBox = styled.div.withConfig({ displayName: "ColorPickerCustomColorBox" }) `
	position: relative;
	background-color: ${props => props.color};
	border-top-right-radius: 15px;
	border-bottom-right-radius: 15px;
	width: 10px;
	height: 100%;

	${IconWrapperStyled} {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 1;
		border-radius: 15px;
	}
`;
