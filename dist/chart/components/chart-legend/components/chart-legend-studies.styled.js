import styled from 'styled-components';
import { ChartLegendItemContainerStyled, ChartLegendItemValueStyled } from './chart-legend-item.styled';
import { ButtonIcon } from '../../../../chart-kit/Button/ButtonIcon.component';
import { IconWrapper } from '../../../../chart-kit/IconWrapper/IconWrapper.component';
import { ButtonInnerStyled } from '../../../../chart-kit/Button/Button.styled';
import { IconStyled } from '../../../../chart-kit/Button/ButtonIcon.styled';
export const ChartLegendStudiesTitleStyled = styled.div.withConfig({ displayName: "ChartLegendStudiesTitleStyled" }) ``;
export const ChartLegendStudiesItemValuesStyled = styled.div.withConfig({ displayName: "ChartLegendStudiesItemValuesStyled" }) `
	position: relative;
	display: flex;
	align-items: center;
	padding-right: var(--spacer-1);
`;
export const ChartLegendStudiesValueStyled = styled(ChartLegendItemValueStyled).withConfig({ displayName: "ChartLegendStudiesValueStyled" }) `
	min-width: fit-content;
	text-align: right;
	margin-left: var(--spacer-2);
	opacity: 1;
`;
export const ChartLegendStudiesItemControlsStyled = styled.div.withConfig({ displayName: "ChartLegendStudiesItemControlsStyled" }) `
	position: ${props => props.position ?? 'absolute'};
	visibility: ${props => (props.isVisible ? 'visible' : 'hidden')};
	display: flex;
	align-items: center;
	@media (max-width: 480px) {
		visibility: visible;
	}
`;
const ChartLegendStudiesItemControlsButtonStyled = styled(ButtonIcon).withConfig({ displayName: "ChartLegendStudiesItemControlsButtonStyled" }) `
	width: 24px;
	height: 20px;
	min-width: auto;
	display: flex;
	background-color: inherit;
	margin: 0;
	padding: 0;

	&:hover {
		background-color: inherit;
	}

	${ButtonInnerStyled} {
		width: 100%;
		height: 100%;
	}

	${IconStyled} {
		width: 100%;
		height: 100%;
		display: flex;
	}
`;
export const ChartLegendStudiesWrapper = styled.div.withConfig({ displayName: "ChartLegendStudiesWrapper" }) `
	display: flex;
	align-items: center;
	background-color: var(--databox-bg);
	height: 20px;
	padding-left: var(--spacer-1);
	margin-top: var(--spacer-1);
	user-select: none;

	div:first-child {
		color: var(--button-secondary-default-text);
	}

	${ChartLegendStudiesItemControlsStyled} {
		margin-left: var(--spacer-1);
	}

	&:hover {
		${ChartLegendStudiesItemControlsStyled} {
			visibility: visible;
			position: static;
		}
	}
`;
export const ChartLegendStudiesItemIconStyled = styled(IconWrapper).withConfig({ displayName: "ChartLegendStudiesItemIconStyled" }) `
	margin: auto;
`;
export const ChartLegendStackedItemWrapperStyled = styled(ChartLegendItemContainerStyled).withConfig({ displayName: "ChartLegendStackedItemWrapperStyled" }) `
	display: flex;
	justify-content: space-between;
	margin-top: var(--spacer-1);
	width: 100%;
`;
export const ChartLegendStudiesItemControlsButtonSettingsStyled = styled(ChartLegendStudiesItemControlsButtonStyled).withConfig({ displayName: "ChartLegendStudiesItemControlsButtonSettingsStyled" }) `
	overflow: hidden;
	transition-duration: 0.8s;
	transition-property: transform;

	&:hover {
		transform: rotate(90deg);
		background-color: transparent;
		${ChartLegendStudiesItemIconStyled} {
			& svg path {
				fill: var(--icon-active-bg);
			}
		}
	}
`;
export const ChartLegendStudiesItemControlsButtonDeleteStyled = styled(ChartLegendStudiesItemControlsButtonStyled).withConfig({ displayName: "ChartLegendStudiesItemControlsButtonDeleteStyled" }) `
	margin-right: -4px;

	&:hover {
		${ChartLegendStudiesItemIconStyled} {
			& svg path {
				fill: var(--main_chart-candle-bear-body-bg);
			}
		}
	}
`;
