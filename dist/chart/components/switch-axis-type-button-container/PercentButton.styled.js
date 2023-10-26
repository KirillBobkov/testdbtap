import styled, { css } from 'styled-components';
import { Button } from '../../../chart-kit/Button/Button.component';
import { IconWrapperStyled } from '../../../chart-kit/IconWrapper/IconWrapper.styled';
export const PercentButtonStyled = styled(Button).withConfig({ displayName: "PercentButtonStyled" }) `
	height: auto;
	min-width: auto;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 4px;
	padding: var(--spacer-1) var(--spacer-2);
	color: var(--main_chart-value-text);
	font-family: var(--font-main);
	font-style: normal;
	font-weight: bold;
	font-size: var(--font-size-m);

	${IconWrapperStyled} {
		width: 11px;
		height: 16px;
		font-style: normal;
	}

	&:hover {
		background: var(--dropdown-list_item-hovered-bg);
	}

	${props => props.isActive &&
    css `
			color: var(--button-primary-default);
		`}
`;
