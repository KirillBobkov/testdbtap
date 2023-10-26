import styled from 'styled-components';
export const DemoCardContainerStyled = styled.article.withConfig({ displayName: "DemoCardContainerStyled" }) `
	display: flex;
	flex-direction: column;
	align-items: stretch;
	font-family: var(--font-main);
	color: var(--dropdown-default-bg);
	border: 1px solid var(--modal-window-border-color);
	font-size: var(--font-size-l);
`;
export const DemoHeaderStyled = styled.header.withConfig({ displayName: "DemoHeaderStyled" }) `
	flex-shrink: 0;
	padding-left: var(--spacer-5);
	background: var(--modal-window-header-bg-color);
`;
export const DemoTitleStyled = styled.h1.withConfig({ displayName: "DemoTitleStyled" }) `
	font-size: var(--font-size-l);
	font-weight: 300;
`;
export const DemoBodyStyled = styled.section.withConfig({ displayName: "DemoBodyStyled" }) `
	flex-grow: 1;
`;
