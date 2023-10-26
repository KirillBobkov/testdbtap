import styled from 'styled-components';
import { Input } from '../../../chart-kit/Input/Input.component';
import { InputStyled } from '../../../chart-kit/Input/Input.styled';
import { Popover } from '../../../chart-kit/Popover/Popover.lazy-component';
import { StyledScrollableContainer } from '../../../chart-kit/Scrollable/Scrollable.styled';
export const SymbolSuggestContainerStyled = styled.div.withConfig({ displayName: "SymbolSuggestContainerStyled" }) `
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
`;
export const SuggestContainerStyled = styled.div.withConfig({ displayName: "SuggestContainerStyled" }) `
	line-height: normal;
	${StyledScrollableContainer} {
		overflow-x: hidden;
	}
`;
export const SymbolSuggestPopoverStyled = styled(Popover).withConfig({ displayName: "SymbolSuggestPopoverStyled" }) `
	border: ${props => (props.noData ? 'none' : '1px solid var(--dropdown-default-border)')};
	border-radius: ${props => (props.noData ? 'var(--spacer-1)' : 'var(--spacer-2)')};
	left: var(--spacer-1);
`;
export const SymbolSuggestInputStyled = styled(Input).withConfig({ displayName: "SymbolSuggestInputStyled" }) `
	width: 100%;
	max-width: 110px;
	min-width: 55px;
	height: 32px;
	padding: var(--spacer-2);
	line-height: var(--line-height-m);
	background-color: var(--main_chart-bg);

	${InputStyled} {
		width: 100%;
		font-family: var(--font-main-semibold);
		font-size: var(--font-size-m);
		line-height: var(--line-height-m);
		color: var(--input-default-text);
		caret-color: var(--icon-active-bg);
		margin: auto;
		display: block;
		border-right-width: 1px;
		&::placeholder {
			color: var(--input-disabled-text);
		}
	}
`;
