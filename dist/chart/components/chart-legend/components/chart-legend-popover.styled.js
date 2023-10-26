import styled from 'styled-components';
import { ButtonsRadioGroup } from '../../../../chart-kit/ButtonsRadioGroup/ButtonsRadioGroup.component';
import { ButtonsRadioGroupButtonStyled } from '../../../../chart-kit/ButtonsRadioGroup/ButtonsRadioGroup.styled';
import { ColorPickerButtonContentStyled, ColorPickerButtonStyled, } from '../../../../chart-kit/ColorPicker/anchors/ColorPickerAnchor.styled';
import { IconWrapperStyled } from '../../../../chart-kit/IconWrapper/IconWrapper.styled';
export const ChartLegendPopoverContainerStyled = styled.div.withConfig({ displayName: "ChartLegendPopoverContainerStyled" }) `
	padding: var(--spacer-3);
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
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
`;
export const ChartLegendPopoverItem = styled.div.withConfig({ displayName: "ChartLegendPopoverItem" }) `
	display: flex;
	align-items: center;
	margin: var(--spacer-1) 0;
	${ColorPickerButtonContentStyled} {
		border-radius: 100%;
	}
	${IconWrapperStyled} {
		background-color: var(--dropdown-default-bg);
		border-radius: 100%;
		svg path {
			display: none;
		}
	}
`;
export const ChartLegendPopoverItemLabel = styled.label.withConfig({ displayName: "ChartLegendPopoverItemLabel" }) `
	margin-right: var(--spacer-5);
	font-family: var(--font-main-semibold);
	font-size: var(--font-size-m);
`;
export const ChartLegendChartTypeButtonsStyled = styled(ButtonsRadioGroup).withConfig({ displayName: "ChartLegendChartTypeButtonsStyled" }) `
	margin-left: -4px;
	${ButtonsRadioGroupButtonStyled} {
		margin-right: 8px;
		min-width: unset;
		padding: 0 var(--spacer-1);
		font-family: var(--font-main-semibold);
		font-size: var(--font-size-m);
	}
`;
