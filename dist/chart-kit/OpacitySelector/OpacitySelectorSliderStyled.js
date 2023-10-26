import styled from 'styled-components';
import { Input } from '../Input/Input.component';
import { InputContainerStyled, InputStyled } from '../Input/Input.styled';
import { IconWrapperStyled } from '../IconWrapper/IconWrapper.styled';
const height = '21px';
const thumbHeight = 18;
const thumbColor = '#fff';
const thumbDisabledColor = '#6E6C6B';
const thumbHoverColor = '#eee';
export const SliderWrapperStyled = styled.div.withConfig({ displayName: "SliderWrapperStyled" }) `
	position: relative;
	overflow: hidden;
	display: block;
	appearance: none;
	max-width: 236px;
	width: 100%;
	margin-right: 4px;
	height: ${height};
	border: 1px solid rgba(255, 255, 255, 0.1);
	border-radius: 24px;

	&:focus-within {
		outline: 1px solid ${props => (props.keyboardModeEnabled ? 'var(--link-default-text)' : 'transparent')};
	}
`;
export const OpacitySelectorSliderStyled = styled.input.withConfig({ displayName: "OpacitySelectorSliderStyled" }) `
	position: relative;
	z-index: 2;
	display: block;
	max-width: 236px;
	width: 100%;
	height: ${height};
	margin: 0;
	background: linear-gradient(
		to right,
		transparent 0%,
		${props => props.startColor} 0%,
		${props => props.endColor} 100%
	);
	overflow: hidden;
	appearance: none;
	cursor: pointer;

	&:focus {
		outline: 1px solid transparent;
	}

	&::-webkit-slider-runnable-track {
		width: 100%;
		height: ${height};
		background: linear-gradient(to right, ${props => props.startColor} 0%, ${props => props.endColor} 100%);
	}

	&::-webkit-slider-thumb {
		position: relative;
		appearance: none;
		height: ${thumbHeight}px;
		width: ${thumbHeight}px;
		background: ${thumbColor};
		border-radius: 100%;
		border: none;
		top: 46%;
		transform: translateY(-50%);
		transition: background-color 150ms;
	}

	&::-moz-range-thumb {
		appearance: none;
		margin: 0;
		height: ${thumbHeight}px;
		width: ${thumbHeight}px;
		background: ${thumbColor};
		border-radius: 100%;
		border: 0;
		transition: background-color 150ms;
	}

	&::-ms-track {
		width: 100%;
		height: ${height};
		border: 0;
		/* color needed to hide track marks */
		color: transparent;
		background: transparent;
	}

	&::-ms-fill-lower {
		background: linear-gradient(to right, ${props => props.startColor} 0%, ${props => props.endColor} 100%);
	}

	&::-ms-thumb {
		appearance: none;
		height: ${thumbHeight}px;
		width: ${thumbHeight}px;
		background: ${thumbColor};
		border-radius: 100%;
		border: 0;
		transition: background-color 150ms;
		top: 0;
		margin: 0;
		box-shadow: none;
	}

	&:hover {
		&::-webkit-slider-thumb {
			background-color: ${thumbHoverColor};
		}

		&::-moz-range-thumb {
			background-color: ${thumbHoverColor};
		}

		&::-ms-thumb {
			background-color: ${thumbHoverColor};
		}
	}

	&:disabled {
		background: transparent;
		&::-webkit-slider-runnable-track {
			background: transparent;
		}
		&::-ms-fill-lower {
			background: transparent;
		}
		&::-ms-thumb {
			background: var(--icon-secondary-default-bg);
		}
		&::-moz-range-thumb {
			background: var(--icon-secondary-default-bg);
		}
		&::-webkit-slider-thumb {
			background: var(--icon-secondary-default-bg);
		}
	}
`;
export const OpacitySelectorTransparentIcon = styled.div.withConfig({ displayName: "OpacitySelectorTransparentIcon" }) `
	position: absolute;
	top: 0;
	z-index: 1;

	${IconWrapperStyled} {
		max-width: 236px;
		height: ${height};

		svg {
			width: auto;
			height: auto;
		}
	}
`;
export const OpacitySelectorInputStyled = styled(Input).withConfig({ displayName: "OpacitySelectorInputStyled" }) `
	position: relative;
	border: none;
	padding: 0;
	margin: 0;
	background-color: inherit;
	border-radius: 4px;

	&:hover {
		background-color: inherit;
	}

	&:disabled {
		color: ${thumbDisabledColor};
	}

	${InputContainerStyled} {
		border: 1px solid rgba(255, 255, 255, 0.1);
		margin: 0;
	}

	${InputStyled} {
		min-width: 0;
		text-align: right;
		// width of '%' symbol
		margin-right: 12px;
		-moz-appearance: textfield;

		::-webkit-outer-spin-button,
		::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
	}

	&:after {
		position: absolute;
		content: '%';
		bottom: -1px;
		right: 1px;
		color: ${props => (props.isDisabled ? `${thumbDisabledColor}` : 'inherit')};
	}
`;
export const OpacitySelectorInputUnitStyled = styled.div.withConfig({ displayName: "OpacitySelectorInputUnitStyled" }) `
	margin-left: 3px;
	display: flex;
	align-items: flex-end;
`;
export const OpacitySelectorInputUnitWrapperStyled = styled.div.withConfig({ displayName: "OpacitySelectorInputUnitWrapperStyled" }) `
	box-sizing: border-box;
	border: 1px solid rgba(255, 255, 255, 0.1);
	max-width: 44px;
	border-radius: 24px;
	padding: 2px 4px;
	display: flex;
	align-items: flex-end;
	width: fit-content;
	justify-content: flex-end;

	${InputStyled} {
		width: auto;
	}
`;
