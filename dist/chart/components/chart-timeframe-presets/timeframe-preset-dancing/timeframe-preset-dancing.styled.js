import styled from 'styled-components';
import { IconWrapper } from '../../../../chart-kit/IconWrapper/IconWrapper.component';
import { TimeframePresetItemStyled } from '../timeframe-preset/timeframe-preset.styled';
export const TimeframePresetItemDancingStyled = styled(TimeframePresetItemStyled).withConfig({ displayName: "TimeframePresetItemDancingStyled" }) `
	position: relative;
	margin-right: var(--spacer-1);
	background-color: rgba(51, 51, 50, 0.5);
	color: var(--dropdown-list_item-default-text);
	user-select: none;

	&:nth-child(2n) {
		animation: ${props => (props.animated ? 'shakeRight 0.25s infinite' : null)};
	}

	&:nth-child(2n-1) {
		animation: ${props => (props.animated ? 'shakeLeft 0.25s infinite' : null)};
	}

	@keyframes shakeRight {
		0% {
			transform: rotate(-4deg);
			animation-timing-function: ease-in;
		}

		50% {
			transform: rotate(4.5deg);
			animation-timing-function: ease-out;
		}
	}

	@keyframes shakeLeft {
		0% {
			transform: rotate(4deg);
			animation-timing-function: ease-in;
		}

		50% {
			transform: rotate(-4.5deg);
			animation-timing-function: ease-out;
		}
	}
`;
export const TimeframePresetItemDancingIconWrapperStyled = styled(IconWrapper).withConfig({ displayName: "TimeframePresetItemDancingIconWrapperStyled" }) `
	position: absolute;
	left: 0;
	width: 100%;
	color: var(--icon-active-bg);
	cursor: pointer;
`;
