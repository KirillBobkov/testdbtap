import styled from 'styled-components';
import { IconWrapper } from '../../../chart-kit/IconWrapper/IconWrapper.component';
import { Input } from '../../../chart-kit/Input/Input.component';
import { InputStyled } from '../../../chart-kit/Input/Input.styled';
export const TimeZoneSearchInputStyled = styled(Input).withConfig({ displayName: "TimeZoneSearchInputStyled" }) `
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	padding-top: var(--spacer-2);
	border-bottom: 1px solid var(--dropdown-list_item-divider-bg);
	background: var(--dropdown-default-bg);
	z-index: 1;
	&:hover {
		border-bottom: 1px solid var(--dropdown-list_item-divider-bg);
		background: var(--dropdown-default-bg);
	}
	&:focus-within {
		outline-offset: -2px;
		border-radius: var(--spacer-2);
	}

	${InputStyled} {
		width: 100%;
		caret-color: var(--icon-active-bg);
		padding-left: var(--spacer-6);
	}
`;
export const TimeZoneNoDataTextStyled = styled.li.withConfig({ displayName: "TimeZoneNoDataTextStyled" }) `
	font-family: var(--font-main-semibold);
	font-size: var(--font-size-m);
	line-height: var(--line-height-m-px);
	padding: var(--spacer-1);
	margin: 0;
	border-radius: 4px;
	justify-content: flex-start;
`;
export const TimeZoneSearchIconWrapperStyled = styled(IconWrapper).withConfig({ displayName: "TimeZoneSearchIconWrapperStyled" }) `
	position: absolute;
	left: var(--spacer-2);
	top: 0;
	color: var(--dropdown-list_item-disabled-text);
`;
