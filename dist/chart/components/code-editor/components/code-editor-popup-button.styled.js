import styled, { css } from 'styled-components';
import { Button } from '../../../../chart-kit/Button/Button.component';
import { ButtonInnerStyled } from '../../../../chart-kit/Button/Button.styled';
export const CodeEditorPopupButtonStyled = styled(Button).withConfig({ displayName: "CodeEditorPopupButtonStyled" }) `
	min-width: 40px;
	height: 22px;
	padding: var(--spacer-1) var(--spacer-2);
	background-color: transparent;
	font-family: var(--font-main-semibold);
	font-size: var(--font-size-m);
	line-height: var(--line-height-m);
	border-radius: 5px;
	display: flex;
	align-items: center;

	${ButtonInnerStyled} {
		display: flex;
		align-items: center;
		height: 16px;
	}

	${props => props.hasIcon &&
    css `
			padding: var(--spacer-1) var(--spacer-2) var(--spacer-1) var(--spacer-05);
		`}

	${props => props.mode === 'default'
    ? css `
					color: var(--dropdown-list_item-default-text);
			  `
    : css `
					color: var(--button-primary-default);
			  `}

	&:hover {
		background-color: var(--dropdown-list_item-hovered-bg);
	}

	&:disabled,
	&[disabled] {
		color: var(--dropdown-list_item-disabled-text);
	}
`;
