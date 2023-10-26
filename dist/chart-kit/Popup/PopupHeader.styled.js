import styled from 'styled-components';
import { ButtonIcon } from '../Button/ButtonIcon.component';
export const PopupHeaderHeading = styled.h2.withConfig({ displayName: "PopupHeaderHeading" }) `
	margin: 0;
	font-weight: bold;
	font-size: var(--font-size-xl);
`;
export const PopupHeaderCloseBtnStyled = styled(ButtonIcon).withConfig({ displayName: "PopupHeaderCloseBtnStyled" }) `
	position: absolute;
	height: 16px;
	width: 16px;
	min-width: auto;
	padding: 0;
	top: 10px;
	right: var(--spacer-3);
	color: var(--icon-primary-default-bg);

	& svg path {
		fill: currentColor;
	}

	&:focus-visible {
		border-radius: 2px;
		outline-offset: 4px;
	}

	&:hover {
		color: var(--icon-active-bg);
	}
`;
export const PopupHeaderContainerStyled = styled.div.withConfig({ displayName: "PopupHeaderContainerStyled" }) ``;
