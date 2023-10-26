import styled from 'styled-components';
export const SelectorStyled = styled.div.withConfig({ displayName: "SelectorStyled" }) `
	display: flex;
	flex-direction: column;
	padding-right: var(--spacer-2);
	width: 93px;
	box-sizing: border-box;
`;
export const SelectorYearsStyled = styled.div.withConfig({ displayName: "SelectorYearsStyled" }) `
	display: flex;
	height: 30px;
	align-items: center;
	position: relative;
	width: 100%;
	margin-left: var(--spacer-2);
`;
export const SelectorContentStyled = styled.div.withConfig({ displayName: "SelectorContentStyled" }) `
	display: flex;
`;
export const SelectorMonthsStyled = styled.div.withConfig({ displayName: "SelectorMonthsStyled" }) `
	display: flex;
	flex: 1;
`;
export const SelectorSeparatorStyled = styled.div.withConfig({ displayName: "SelectorSeparatorStyled" }) `
	align-self: stretch;
	margin-left: var(--spacer-1);
	margin-top: var(--spacer-2);
	margin-bottom: var(--spacer-1);
	border-left: 1px solid var(--dropdown-list_item-divider-bg);
`;
export const SelectorMonthListStyled = styled.div.withConfig({ displayName: "SelectorMonthListStyled" }) `
	display: flex;
	flex-direction: column;
	width: 100%;
	margin: 0;
	padding: var(--spacer-2) var(--spacer-2) 0;
	box-sizing: border-box;
`;
