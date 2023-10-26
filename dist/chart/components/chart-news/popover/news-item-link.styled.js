import styled from 'styled-components';
export const NewsItemLinkStyled = styled.a.withConfig({ displayName: "NewsItemLinkStyled" }) `
	display: block;
	padding: var(--spacer-2);

	font-family: var(--font-main-semibold);
	font-size: var(--font-size-m);
	line-height: var(--line-height-m-px);
	color: var(--dropdown-list_item-default-text);
	text-decoration: none;

	&:hover {
		color: var(--link-default-text);
	}
	&:visited {
		color: var(--dropdown-list_item-default-text);
		&:hover {
			color: var(--link-default-text);
		}
	}
`;
