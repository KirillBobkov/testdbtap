import styled from 'styled-components';
import { IconWrapper } from '../../../chart-kit/IconWrapper/IconWrapper.component';
export const ThemeSwitcherMenuStyled = styled.div.withConfig({ displayName: "ThemeSwitcherMenuStyled" }) `
	display: flex;
	align-items: center;
`;
export const ThemeSwitcherItemIconWrapperStyled = styled(IconWrapper).withConfig({ displayName: "ThemeSwitcherItemIconWrapperStyled" }) `
	border-radius: var(--spacer-1);
	margin-bottom: var(--spacer-1);

	& svg {
		width: 90px;
		height: 50px;
	}
`;
export const ThemeSwitcherItemTextStyled = styled.span.withConfig({ displayName: "ThemeSwitcherItemTextStyled" }) `
	font-family: var(--font-main-semibold);
	font-size: var(--font-size-m);
	line-height: var(--line-height-m-px);
	text-align: center;
`;
export const ThemeSwitcherItemStyled = styled.div.withConfig({ displayName: "ThemeSwitcherItemStyled" }) `
	width: 90px;
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;
	margin-right: var(--spacer-1);
	&:last-child {
		margin-right: 0;
	}

	${ThemeSwitcherItemTextStyled} {
		color: ${props => props.active ? 'var(--dropdown-list_item-selected-text)' : 'var(--dropdown-list_item-default-text)'};
	}

	${ThemeSwitcherItemIconWrapperStyled} {
		border: ${props => (props.active ? 'var(--dropdown-list_item-selected-text) 1px solid' : 'none')};
		padding: ${props => (props.active ? 0 : '1px')};
	}
`;
