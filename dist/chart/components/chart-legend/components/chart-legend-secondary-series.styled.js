import styled from 'styled-components';
import { ChartLegendItemContainerStyled, ChartLegendItemValueStyled } from './chart-legend-item.styled';
import { Button } from '../../../../chart-kit/Button/Button.component';
import { ButtonInnerStyled } from '../../../../chart-kit/Button/Button.styled';
export const ChartLegendItemContainerExtendStyled = styled(ChartLegendItemContainerStyled).withConfig({ displayName: "ChartLegendItemContainerExtendStyled" }) `
	width: 100%;
	justify-content: space-between;
`;
export const ChartLegendSecondarySeriesItemControlsStyled = styled.div.withConfig({ displayName: "ChartLegendSecondarySeriesItemControlsStyled" }) `
	display: ${props => (props.keyboardModeEnabled ? 'flex' : 'none')};
	margin-right: calc(var(--spacer-1) * -1);
	overflow: hidden;
`;
export const ChartLegendSecondarySeriesItemValueStyled = styled(ChartLegendItemValueStyled).withConfig({ displayName: "ChartLegendSecondarySeriesItemValueStyled" }) `
	display: ${props => (props.keyboardModeEnabled ? 'none' : 'flex')};
	font-weight: 400;
`;
export const ChartLegendSecondarySeriesItemContainerStyled = styled(ChartLegendItemContainerExtendStyled).withConfig({ displayName: "ChartLegendSecondarySeriesItemContainerStyled" }) `
	margin-top: var(--spacer-1);
	${props => props.isPopoverOpened
    ? `
					${ChartLegendSecondarySeriesItemValueStyled} {
						display: none;
					}
					${ChartLegendSecondarySeriesItemControlsStyled} {
						display: flex;
					}
			  `
    : `
					&:hover {
						${ChartLegendSecondarySeriesItemValueStyled} {
							display: none;
						}
						${ChartLegendSecondarySeriesItemControlsStyled} {
							display: flex;
						}
					}
			  `}
`;
export const ChartLegendSettingsButtonStyled = styled(Button).withConfig({ displayName: "ChartLegendSettingsButtonStyled" }) `
	min-width: auto;
	height: 16px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: none;
	padding: var(--spacer-05);

	&:hover,
	:focus {
		background: transparent;
	}

	&:hover ${ButtonInnerStyled} {
		transform: rotate(90deg);
		background-color: transparent;
	}

	&:hover svg path {
		fill: var(--icon-active-bg);
	}

	${ButtonInnerStyled} {
		overflow: hidden;
		transition-duration: 0.8s;
		transition-property: transform;
	}
`;
export const ChartLegendDeleteButtonStyled = styled(Button).withConfig({ displayName: "ChartLegendDeleteButtonStyled" }) `
	min-width: auto;
	height: 16px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: none;
	padding: var(--spacer-05);

	&:hover,
	:focus {
		background: transparent;
	}

	&:hover svg path {
		fill: var(--main_chart-candle-bear-body-bg);
	}
`;
