import styled from 'styled-components';
import { Button } from '../../Button/Button.component';
import { IconWrapper } from '../../IconWrapper/IconWrapper.component';
export const ColorPickerPopoverAddColor = styled(Button).withConfig({ displayName: "ColorPickerPopoverAddColor" }) `
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 20px;
	height: 20px;
	min-width: 20px;
	padding: 0;
	border-radius: 50%;
	cursor: pointer;
	background-color: transparent;
	&:hover {
		background-color: transparent;
	}
`;
export const ColorPickerAgreeIconWrapperStyled = styled(IconWrapper).withConfig({ displayName: "ColorPickerAgreeIconWrapperStyled" }) `
	position: absolute;
	top: 50%;
	left: 50%;
	width: 50%;
	height: 50%;
	transform: translate(-50%, -50%);
	color: ${({ iconColor }) => iconColor};
`;
export const ColorPickerAgreeButtonPalleteStyled = styled.div.withConfig({ displayName: "ColorPickerAgreeButtonPalleteStyled" }) `
	box-sizing: border-box;
	margin-right: 4px;
	margin-bottom: 4px;
	transform: scale(1.2);
	border: 2px solid var(--palette-color-border, #fff);
	padding: 1px;
	background-clip: content-box;
	background-color: ${({ color }) => color};
	position: relative;
	display: flex;
	align-items: center;
	width: 20px;
	height: 20px;
	border-radius: 50%;
`;
