import styled from 'styled-components';
import { Popover } from '../Popover/Popover.lazy-component';
import { PopoverContentStyled } from '../Popover/Popover.styled';
import { OpacitySelectorInputStyled } from '../OpacitySelector/OpacitySelectorSliderStyled';
export const ColorPickerContent = styled.div.withConfig({ displayName: "ColorPickerContent" }) `
	padding: var(--spacer-1);

	${OpacitySelectorInputStyled} {
		&:after {
			bottom: 0;
		}
	}
`;
export const ColorPickerPopoverStyled = styled(Popover).withConfig({ displayName: "ColorPickerPopoverStyled" }) `
	top: calc(var(--spacer-5) * -1);

	${PopoverContentStyled}:not(:empty) {
		padding: var(--spacer-0.5);
		background-color: rgba(55, 55, 54, 1); //change to var when it appears in figma
	}
`;
export const ColorPickerContentWrapper = styled.div.withConfig({ displayName: "ColorPickerContentWrapper" }) `
	overflow: hidden;
`;
//default droppable placeholder expands palette, so this is why it needs a 0px wrapper
export const ColorPickerContentPlaceHolder = styled.div.withConfig({ displayName: "ColorPickerContentPlaceHolder" }) `
	max-height: 0px;
`;
