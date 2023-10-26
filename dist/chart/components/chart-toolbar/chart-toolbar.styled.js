import styled from 'styled-components';
import { ButtonIcon } from '../../../chart-kit/Button/ButtonIcon.component';
export const ChartToolbarArea = styled.div.withConfig({ displayName: "ChartToolbarArea" }) `
	background: var(--main_chart-bg);
	border-bottom: 1px solid var(--main_chart-grid-line);
`;
export const ChartToolbarLoadingIndicatorStyled = styled.div.withConfig({ displayName: "ChartToolbarLoadingIndicatorStyled" }) `
	position: absolute;
	content: '';
	display: block;
	width: ${props => `${props.percentage}%`};
	height: 1px;
	background-color: var(--main_chart-progress_bar_bg);
	transition: width 300ms ease-out;
	bottom: -1px;
	z-index: 2;
`;
export const ChartToolbarStyled = styled.div.withConfig({ displayName: "ChartToolbarStyled" }) `
	position: relative;
	display: flex;
	width: 100%;
	top: 0;
	left: 0;
	background: var(--main_chart-bg);
	align-items: center;
`;
export const ChartToolbarPopupsButtonsStyled = styled.div.withConfig({ displayName: "ChartToolbarPopupsButtonsStyled" }) `
	display: flex;
	margin-left: auto;
	margin-right: auto;
	position: relative;
	height: 32px;

	min-width: 0;
	@media (max-width: 480px) {
		padding-left: var(--spacer-4);
		padding-right: var(--spacer-4);
	}
`;
export const ChartToolbarPopupsButtonsWrapperStyled = styled.div.withConfig({ displayName: "ChartToolbarPopupsButtonsWrapperStyled" }) `
	display: flex;
	overflow-x: scroll;

	&::-webkit-scrollbar {
		display: none;
	}

	@supports (-moz-appearance: none) {
		scrollbar-width: none;
	}
`;
export const ChartToolbarPopupsButtonsTrackStyled = styled.div.withConfig({ displayName: "ChartToolbarPopupsButtonsTrackStyled" }) `
	display: flex;
	align-items: center;
	position: relative;
	transition: left ease 0.2s;
`;
export const ChartToolbarPopupsButtonsArrowStyled = styled(ButtonIcon).withConfig({ displayName: "ChartToolbarPopupsButtonsArrowStyled" }) `
	position: absolute;
	${props => (props.float === 'right' ? 'right: 0px' : null)};
	${props => (props.float === 'left' ? 'left: 0px' : null)};
	transform: rotate(${props => (props.float === 'right' ? '0' : '180deg')});
	border-radius: 0;
	top: 0;
	border-left: 1px solid var(--main_chart-grid-line);
	color: var(--toolbar-button-default-color);
	background-color: var(--main_chart-bg);
	height: 100%;
	width: 17px;
	min-width: auto;
	margin: 0;

	&:hover {
		background-color: var(--toolbar-button-default-hover-bg);
	}
`;
export const MultiChartSettingsButtonStyled = styled.div.withConfig({ displayName: "MultiChartSettingsButtonStyled" }) `
	display: flex;

	button:first-child {
		margin-right: 5px;
	}

	@media (max-width: 480px) {
		display: none;
	}
`;
export const InstrumentSelectorContainerWrapperStyled = styled.div.withConfig({ displayName: "InstrumentSelectorContainerWrapperStyled" }) ``;
