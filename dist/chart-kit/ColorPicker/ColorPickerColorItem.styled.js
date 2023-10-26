import styled, { css } from 'styled-components';
import { MenuItem } from '../Menu/MenuItem.component';
import { DEFAULT_TRANSPARENT_COLOR } from './ColorPicker.model';
import { isWhite } from './utils/color-picker-functions';
export const ColorPickerMenuItemStyled = styled(MenuItem).withConfig({ displayName: "ColorPickerMenuItemStyled" }) `
	overflow: visible;
	position: relative;
	box-sizing: border-box;
	margin-right: var(--spacer-1);
	margin-bottom: var(--spacer-1);
	padding: 0;
	border-radius: 50%;

	&:focus-visible {
		outline: 1px solid var(--button-focus-border);
		// rewrite outline-offset chart-react-wrapper selector
		outline-offset: 1px !important;
	}

	&:hover {
		background: none;
		border-radius: 0;
	}

	&:nth-child(12n) {
		margin-right: 0;
	}
`;
export const ColorPickerButtonPaletteStyled = styled.div.withConfig({ displayName: "ColorPickerButtonPaletteStyled" }) `
	background-color: ${({ color }) => (color !== DEFAULT_TRANSPARENT_COLOR ? color : 'rgba(255, 255, 255, 1)')};
	position: relative;
	display: flex;
	align-items: center;
	width: 20px;
	height: 20px;
	box-sizing: border-box;
	border-radius: 50%;

	${props => isWhite(props.color) &&
    css `
			border: 1px solid var(--palette-color-border);
		`}

	&:hover {
		transform: ${({ isActive }) => (isActive ? 'scale(1.2)' : 'scale(1.1)')};
	}
	${props => props.isActive &&
    css `
			transform: scale(1.2);
			border: 2px solid var(--palette-color-border, #fff);
			padding: 1px;
			background-clip: content-box;
		`}

	&::after {
		box-sizing: border-box;
		content: '';
		transform: translate(-50%, -50%);
		transform: rotate(45deg);
		width: 20px;
		height: 1px;
		z-index: 1;
		background-color: red;
		display: ${({ color }) => (color !== DEFAULT_TRANSPARENT_COLOR ? 'none' : 'block')};
	}
`;
