import styled from 'styled-components';
import { MenuItem } from '../../../../chart-kit/Menu/MenuItem.component';
import { HighlightMarkStyled } from '../../../../chart-kit/Highlight/Highlight.styled';
import { Highlight } from '../../../../chart-kit/Highlight/Highlight.component';
export const SymbolSuggestListMenuItem = styled(MenuItem).withConfig({ displayName: "SymbolSuggestListMenuItem" }) ``;
export const SymbolSuggestListItemRowStyled = styled.tr.withConfig({ displayName: "SymbolSuggestListItemRowStyled" }) `
	margin: 0;
	padding: 0 var(--spacer-3) 0 0;
	border: 0;
	font: inherit;
	line-height: var(--line-height-m);
	vertical-align: baseline;
	text-align: left;
	cursor: pointer;
	background-color: ${props => props.isHovered && 'var(--dropdown-list_item-hovered-bg)'};
	@media (max-width: 650px) {
		max-width: 320px;
		font-size: var(--font-size-s);
	}
	@media (max-width: 510px) {
		max-width: 220px;
	}
	@media (max-width: 430px) {
		max-width: 120px;
	}
`;
export const SymbolSuggestListItemColumnStyled = styled.td.withConfig({ displayName: "SymbolSuggestListItemColumnStyled" }) `
	margin: 0;
	padding: var(--spacer-1) var(--spacer-1) var(--spacer-1) var(--spacer-2);
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
	text-align: left;
	@media (max-width: 650px) {
		max-width: 320px;
		:nth-child(2n) {
			span {
				display: block;
			}
		}
	}
	@media (max-width: 510px) {
		max-width: 220px;
	}
	@media (max-width: 430px) {
		max-width: 120px;
	}
`;
export const SymbolSuggestListItemColumnNameStyled = styled(SymbolSuggestListItemColumnStyled).withConfig({ displayName: "SymbolSuggestListItemColumnNameStyled" }) `
	border-top-left-radius: 6px;
	border-bottom-left-radius: 6px;
`;
export const SymbolSuggestListItemColumnTypeStyled = styled(SymbolSuggestListItemColumnStyled).withConfig({ displayName: "SymbolSuggestListItemColumnTypeStyled" }) `
	border-top-right-radius: 6px;
	border-bottom-right-radius: 6px;
	text-align: right;
	vertical-align: middle;
	padding-right: var(--spacer-2);
	color: var(--dropdown-description-text);
`;
export const SymbolSuggestHighlightStyled = styled(Highlight).withConfig({ displayName: "SymbolSuggestHighlightStyled" }) `
	position: relative;
	display: inline-block;
	max-width: 400px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	${HighlightMarkStyled} {
		background-color: transparent;
		color: var(--dropdown-list_item-selected-text);
	}
`;
