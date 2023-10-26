import styled, { css } from 'styled-components';
import { Menu } from '../Menu/Menu.component';
import { MenuStyled } from '../Menu/Menu.styled';
import { MenuItem } from '../Menu/MenuItem.component';
import { DEFAULT_TRANSPARENT_COLOR } from './ColorPicker.model';
import { isWhite } from './utils/color-picker-functions';
export const ColorPickerMenuStyled = styled(Menu).withConfig({ displayName: "ColorPickerMenuStyled" }) `
	box-sizing: content-box;
	display: flex;
	flex-wrap: wrap;
	width: 284px;

	${MenuStyled} {
		display: flex;
		flex-wrap: wrap;
	}
	// allows to cancel most of the drag and drop library animations, looks like a hack, but this approach is how library developers themselves suggest to get rid of the animations
	// https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/drop-animation.md
	div[data-rbd-draggable-context-id] {
		transition: 0.001s !important;
		transform: translate(0px, 0px) !important;
	}
`;
export const ColorPickerMenuItemStyled = styled(MenuItem).withConfig({ displayName: "ColorPickerMenuItemStyled" }) `
	overflow: visible;
	position: relative;
	box-sizing: border-box;
	margin-right: var(--spacer-1);
	margin-bottom: var(--spacer-1);
	padding: 0;

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
		transform: scale(1.1);
	}
	${props => props.isActive &&
    css `
			transform: scale(1.2);
			border: 2px solid var(--palette-color-border, #fff);
			padding: 1px;
			background-clip: content-box;

			&:hover {
				background-clip: border-box;
				transform: scale(1.2);
				padding: 0;
			}
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
export const ColorPickerPopoverMain = styled.div.withConfig({ displayName: "ColorPickerPopoverMain" }) `
	padding: var(--spacer-1);
	overflow-x: hidden;

	.react-colorful__interactive:focus .react-colorful__pointer {
		transform: translate(-50%, -50%) scale(1);
	}

	& .react-colorful__saturation {
		margin-bottom: var(--spacer-1);
		border-radius: var(--spacer-1);
		border-bottom: none;
	}

	& .react-colorful__last-control {
		border-radius: var(--spacer-1);
	}

	& .react-colorful__hue {
		height: 20px;
	}

	& .react-colorful__hue-pointer {
		background-color: #ffffff;
		border-radius: var(--spacer-1);
		width: 10px;
		height: 22px;
		box-shadow: none;
	}

	& .react-colorful__hue-pointer > div {
		background-color: #ffffff !important;
	}
`;
export const ColorPickerWrapper = styled.div.withConfig({ displayName: "ColorPickerWrapper" }) `
	position: relative;
`;
export const ColorPickerDraggableItemWrapper = styled.div.withConfig({ displayName: "ColorPickerDraggableItemWrapper" }) `
	transition: all 0.001s !important;
`;
