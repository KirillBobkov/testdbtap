import styled, { css } from 'styled-components';
export const RangeSliderWrapper = styled.div.withConfig({ displayName: "RangeSliderWrapper" }) `
	width: 211px;
	position: relative;
	${props => props.keyboardModeEnabled &&
    css `
			&:focus-within {
				border-radius: var(--spacer-05);
				outline: 1px solid var(--input-focused-border);
				outline-offset: var(--spacer-05);
			}
		`}

	${props => props.showLabels &&
    css `
			&::before,
			&::after {
				position: absolute;
				top: var(--spacer-3);
				font: var(--font-main-semibold);
				font-size: var(--font-size-m);
				font-weight: 600;
				color: var(--dropdown-description-text);
			}
			&::before {
				content: '${props => props.labels.first}';
				left: 0;
			}
			&::after {
				content: '${props => props.labels.last}';
				right: 0;
			}
		`}
`;
export const RangeSliderStyled = styled.input.withConfig({ displayName: "RangeSliderStyled" }) `
	position: relative;
	display: block;
	height: 1px;
	// Transparent borders are needed to make input size bigger
	// for better accessability, but visually it stays with 1px height
	border-top: calc(var(--spacer-05) * 3) solid transparent;
	border-bottom: calc(var(--spacer-05) * 3) solid transparent;
	box-sizing: border-box;
	width: inherit;
	margin: 0;
	background: linear-gradient(
		to right,
		${props => props.disabledSectionsColor} 0%,
		${props => props.disabledSectionsColor} ${props => props.disabledLeftWidth && props.disabledLeftWidth + 1}px,
		var(--slider-bg) ${props => props.disabledLeftWidth}px,
		var(--slider-bg) ${props => props.disabledRightWidth}px,
		${props => props.disabledSectionsColor} ${props => props.disabledRightWidth}px,
		${props => props.disabledSectionsColor} 100%
	);
	appearance: none;
	cursor: pointer;
	&:focus {
		outline: 1px solid transparent;
	}
	::-webkit-slider-thumb {
		position: relative;
		appearance: none;
		height: 13px;
		width: 5px;
		background: var(--icon-active-bg);
		border-radius: var(--spacer-1);
		border: none;
	}
	::-moz-range-thumb {
		position: relative;
		appearance: none;
		height: 13px;
		width: 5px;
		background: var(--icon-active-bg);
		border-radius: var(--spacer-1);
		border: none;
	}
`;
export const RangeSliderBreakpoints = styled.div.withConfig({ displayName: "RangeSliderBreakpoints" }) `
	display: flex;
	border-bottom: 1px solid var(--slider-bg);
	margin-bottom: calc(var(--spacer-2) * -1);
`;
export const RangeSliderBreakpoint = styled.div.withConfig({ displayName: "RangeSliderBreakpoint" }) `
	min-width: 1px;
	height: var(--spacer-1);
	background-color: var(--slider-bg);
	&:not(:last-child) {
		margin-right: ${props => props.sectionWidth - 1}px; // -1 because the div itself is 1px;
	}
	&:last-child {
		transform: translateX(-1px);
	}
`;
export const RangeSliderBreakpointDisabled = styled(RangeSliderBreakpoint).withConfig({ displayName: "RangeSliderBreakpointDisabled" }) `
	background-color: ${props => props.disabledBreakpointColor};
`;
