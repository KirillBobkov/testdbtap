import styled, { css } from 'styled-components';
export const MenuItemStyled = styled.li.withConfig({ displayName: "MenuItemStyled" }) `
	position: relative;
	line-height: var(--line-height-m);
	white-space: nowrap;
	font-size: var(--font-size-m);
	overflow: hidden;
	text-overflow: ellipsis;
	cursor: pointer;
	transform-origin: top center;
	transition: color 220ms ease-in;
	padding: var(--spacer-1);
	fill: currentColor;
	color: var(--dropdown-list_item-default-text);
	display: flex;
	justify-content: space-between;
	font-weight: 600;
	&:hover {
		background: ${props => props.isMobile ? 'var(--dropdown-default-bg)' : 'var(--dropdown-list_item-hovered-bg)'};
		border-radius: var(--spacer-1);
	}

	&:focus-visible {
		outline: 1px solid var(--button-focus-border);
		outline-offset: -1px;
	}

	${props => props.isActive &&
    css `
			color: var(--dropdown-list_item-selected-text);
		`}
`;
