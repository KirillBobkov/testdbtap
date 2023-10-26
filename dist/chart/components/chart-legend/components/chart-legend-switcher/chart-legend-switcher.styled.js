import styled from 'styled-components';
import { ifStyle } from '../../../../../utils/styled.utils';
import { getNewValidRGBAColor } from '../../../../../chart-kit/ColorPicker/utils/color-picker-functions';
import { CHART_REACT_WRAPPER_ID } from '../../../../chart-react-app.styled';
export const ChartSwitcherContent = styled.div.withConfig({ displayName: "ChartSwitcherContent" }) ``;
export const ChartLegendScrollIconStyled = styled.div.withConfig({ displayName: "ChartLegendScrollIconStyled" }) `
	text-align: center;
	color: var(--icon-secondary-default-bg);
	cursor: pointer;
	border-radius: 0 0 4px 4px;
	position: absolute;
	width: 100%;
	bottom: 0;
	left: 0;

	background: ${() => {
    const element = document.getElementById(CHART_REACT_WRAPPER_ID);
    if (element) {
        const color = window.getComputedStyle(element).getPropertyValue('--main_chart-bg').trim();
        return `linear-gradient(
                    180deg,
                    ${getNewValidRGBAColor(color, 0)} 0%,
                    ${getNewValidRGBAColor(color, 100)} 100%
                )`;
    }
    return 'linear-gradient(180deg, rgba(20, 20, 19, 0) 0%, #141413 100%);';
}};

	&:hover {
		color: var(--icon-primary-default-bg);
	}
`;
export const ChartLegendInstrumentStyled = styled.div.withConfig({ displayName: "ChartLegendInstrumentStyled" }) `
	line-height: var(--line-height-xl-px);
	margin-right: var(--spacer-1);
`;
export const ChartLegendPeriodStyled = styled.div.withConfig({ displayName: "ChartLegendPeriodStyled" }) `
	line-height: var(--line-height-xl-px);
	margin-left: var(--spacer-1);
`;
export const ChartLegendTimeStyled = styled.div.withConfig({ displayName: "ChartLegendTimeStyled" }) `
	line-height: var(--line-height-xl-px);
`;
export const ChartLegendSwitcherButtonStyled = styled.button.withConfig({ displayName: "ChartLegendSwitcherButtonStyled" }) `
	all: unset;
	height: '24px';
	width: fit-content;
	padding: 0 var(--spacer-1);
	font-size: var(--font-size-m);
	color: ${props => (props.isOpened ? 'var(--databox-text-default)' : 'var(--icon-secondary-default-bg)')};
	font-family: var(--font-main-semibold);
	font-feature-settings: 'tnum' on, 'lnum' on;
	display: flex;
	align-items: center;
	border-radius: 4px;
	user-select: none;
	background-color: transparent;

	${props => ifStyle(!props.isDisabled) `
		cursor: pointer;
	`}

	&:focus-visible {
		outline: 1px solid var(--button-focus-border);
	}
`;
export const ChartLegendSwitcherIconStyled = styled.div.withConfig({ displayName: "ChartLegendSwitcherIconStyled" }) `
	position: relative;
	height: fit-content;
	margin: 0 var(--spacer-05);
	${props => (props.isOpened ? 'transform: rotate(-180deg)' : 'transform: translateY(-1px);')};
	transition: transform ${props => `${props.duration}ms`};
	color: var(--icon-secondary-default-bg);
`;
export const ChartLegendSwitcherStyled = styled.div.attrs((props) => ({
    'data-opened': props.isOpened,
})).withConfig({ displayName: "ChartLegendSwitcherStyled" }) `
	position: absolute;
	display: flex;
	flex-flow: column nowrap;
	width: auto;
	top: ${props => props.y}px;
	left: ${props => props.x}px;
	padding: var(--spacer-1) 0 var(--spacer-2) var(--spacer-1);
	background-color: ${props => (props.isOpened ? 'var(--databox-bg)' : 'transparent')};

	&:hover {
		${ChartLegendSwitcherButtonStyled} {
			color: var(--databox-text-default);
			${ChartLegendSwitcherIconStyled} {
				color: ${props => props.isOpened ? 'var(--icon-secondary-default-bg)' : 'var(--icon-primary-default-bg)'};
			}
		}
	}
`;
export const ChartLegendSwitcherDropdownContainerStyled = styled.div.withConfig({ displayName: "ChartLegendSwitcherDropdownContainerStyled" }) `
	padding-right: var(--spacer-2);
`;
export const ChartLegendSwitcherDropdownStyled = styled.div.withConfig({ displayName: "ChartLegendSwitcherDropdownStyled" }) `
	width: 100%;
	overflow: hidden;
	max-height: ${props => (props.isOpened ? `${props.height}px` : '0 !important')};
	opacity: ${props => (props.isOpened ? '1' : '0')};
	transition: all ${props => `${props.duration}ms`};

	${ChartLegendSwitcherDropdownContainerStyled} {
		height: ${props => `${props.height}px`};
	}

	// need for fix bug with firefox scroll size. Can be removed after remade Scrollable to SC
	@supports (scrollbar-width: none) {
		div[class^='scrollable_container'] {
			scrollbar-width: none;
			width: 100% !important;
			height: 100% !important;
			margin: 0 !important;
		}
	}
`;
