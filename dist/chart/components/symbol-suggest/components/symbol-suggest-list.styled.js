import styled from 'styled-components';
export const SymbolSuggestMenuStyled = styled.table.withConfig({ displayName: "SymbolSuggestMenuStyled" }) `
	border-collapse: collapse;
	border-spacing: 0;
	margin: 0;
	padding: 0;
	border: 0;
	vertical-align: baseline;
	table-layout: auto;
	width: auto;
	font-family: var(--font-main-semibold);
`;
export const SymbolListScrollableStyled = styled.div.withConfig({ displayName: "SymbolListScrollableStyled" }) `
	padding: var(--spacer-1);
	max-height: 200px;
`;
export const SymbolListAdditionalStyled = styled.div.withConfig({ displayName: "SymbolListAdditionalStyled" }) `
	&:not(:empty) {
		padding: var(--spacer-1) 0;
		margin-top: var(--spacer-2);
		box-sizing: border-box;
		border-top: 1px solid var(--dropdown-list_item-divider-bg);
		text-align: center;
		color: var(--dropdown-description-text);
	}
`;
export const SymbolSuggestTbodyStyled = styled.tbody.withConfig({ displayName: "SymbolSuggestTbodyStyled" }) ``;
