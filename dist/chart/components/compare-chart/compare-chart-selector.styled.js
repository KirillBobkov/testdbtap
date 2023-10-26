import { Popover } from '../../../chart-kit/Popover/Popover.lazy-component';
import styled from 'styled-components';
import { InputContainerStyled } from '../../../chart-kit/Input/Input.styled';
import { SymbolSuggest } from '../symbol-suggest/symbol-suggest.component';
import { SuggestContainerStyled } from '../symbol-suggest/symbol-suggest.styled';
export const CompareChartPopoverStyled = styled(Popover).withConfig({ displayName: "CompareChartPopoverStyled" }) `
	margin: 1px 0 0;
`;
export const CompareChartContainerStyled = styled.div.withConfig({ displayName: "CompareChartContainerStyled" }) `
	font-family: var(--font-main-semibold);
	max-width: 460px;
	height: auto;
`;
export const CompareChartNoDataContentStyled = styled.p.withConfig({ displayName: "CompareChartNoDataContentStyled" }) `
	margin: 0;
	vertical-align: baseline;
	color: var(--dropdown-description-text);
	padding: var(--spacer-1) var(--spacer-3) var(--spacer-2);
	user-select: none;
	pointer-events: none;
	white-space: pre-line;
`;
export const CompareChartSymbolSuggestStyled = styled(SymbolSuggest).withConfig({ displayName: "CompareChartSymbolSuggestStyled" }) `
	${SuggestContainerStyled} {
		min-width: 228px;
		max-width: 448px;
	}

	${InputContainerStyled} {
		height: 28px;
		max-width: 100%;
		padding: 6px var(--spacer-3);
		margin: var(--spacer-1);
		border-radius: 6px;
		background-color: var(--dropdown-list_item-hovered-bg);
		width: calc(100% - 2 * var(--spacer-1));

		&:focus-within {
			outline-offset: -3px;
			border-radius: var(--spacer-2);
		}
	}
`;
