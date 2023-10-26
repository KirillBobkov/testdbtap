import styled from 'styled-components';
import { InputStyled, InputContainerStyled } from '../../../chart-kit/Input/Input.styled';
import { SymbolSuggestWithPopover } from '../../components/symbol-suggest/symbol-suggest.component';
import { SymbolSuggestInputStyled } from '../../components/symbol-suggest/symbol-suggest.styled';
export const MainSymbolSuggestStyled = styled(SymbolSuggestWithPopover).withConfig({ displayName: "MainSymbolSuggestStyled" }) `
	${SymbolSuggestInputStyled} {
		background: var(--main_chart-bg);
		width: 80px;
		max-width: 80px;
		height: 32px;
		border-right: 1px solid var(--main_chart-grid-line);

		&:focus-within {
			outline-offset: -1px;
		}
	}

	${InputContainerStyled} {
		border-radius: 0;
	}

	${InputStyled} {
		height: 32px;
		width: 80px;
		transform: translate(-8px, -7px);
		padding: 8px;
		font-family: var(--font-main-semibold);
		font-size: var(--font-size-m);
		line-height: var(--line-height-s-px);

		&::placeholder {
			color: var(--input-disabled-text);
		}

		&:disabled {
			color: var(--input-disabled-text);
		}

		&:hover:enabled:not(:focus) {
			background-color: var(--dropdown-list_item-hovered-bg);
		}

		&:hover:disabled {
			background-color: var(--main_chart-bg);
		}

		&::selection {
			background: var(--text-selection-bg);
		}

		&:focus-within,
		&:active {
			outline-offset: -1px;
		}

		&[disabled]::selection,
		&:disabled::selection {
			background: var(--main_chart-bg);
		}
	}
`;
export const InstrumentSelectorDataStateFailureStyled = styled.div.withConfig({ displayName: "InstrumentSelectorDataStateFailureStyled" }) `
	position: absolute;
	bottom: 0;
	left: 0;
	z-index: 1;
	height: 1px;
	width: 79px;
	background-color: var(--main_chart-candle-bear-body-bg);
`;
