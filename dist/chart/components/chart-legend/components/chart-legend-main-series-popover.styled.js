import styled from 'styled-components';
import { ColorPickerButtonContentStyled, ColorPickerButtonStyled, } from '../../../../chart-kit/ColorPicker/ColorPickerAnchor.styled';
import { Popover } from '../../../../chart-kit/Popover/Popover.lazy-component';
import { PopoverContentStyled } from '../../../../chart-kit/Popover/Popover.styled';
import { ChartSettingsFieldsetGroupItem } from '../../chart-settings/chart-settings-fieldset.styled';
export const MainSeriesPopover = styled(Popover).withConfig({ displayName: "MainSeriesPopover" }) `
	${PopoverContentStyled} {
		overflow: hidden;
	}
`;
export const MainSeriesPopoverAnchor = styled.div.withConfig({ displayName: "MainSeriesPopoverAnchor" }) `
	position: absolute;
	opacity: 0;
	width: 0;
	height: 0;
	left: ${props => props.x}px;
	top: ${props => props.y}px;
`;
export const MainSeriesPopoverContainerStyled = styled.div.withConfig({ displayName: "MainSeriesPopoverContainerStyled" }) `
	padding: var(--spacer-1);
	line-height: var(--line-height-l-px);
	font-size: var(--font-size-l);
	color: var(--main-text-color);

	${ColorPickerButtonStyled} {
		border-radius: 100%;
		&:focus {
			transform: scale(1.1);
			${ColorPickerButtonContentStyled} {
				transform: scale(0.9);
			}
		}
	}

	${ChartSettingsFieldsetGroupItem}:last-of-type {
		margin-bottom: 0;
	}
`;
