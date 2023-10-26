import styled from 'styled-components';
export const ProgressBarLoaderStyled = styled.div.withConfig({ displayName: "ProgressBarLoaderStyled" }) `
	width: 100%;
`;
export const ProgressBarLoaderContainerStyled = styled.div.withConfig({ displayName: "ProgressBarLoaderContainerStyled" }) `
	width: 100%;
	height: 2px;
	background: var(--main_chart-grid-line);
`;
export const ProgressBarLoaderThumbStyled = styled.span.withConfig({ displayName: "ProgressBarLoaderThumbStyled" }) `
	display: block;
	width: ${props => props.width + '%'};
	transition: width ease 1s;
	height: 100%;
	background: var(--icon-secondary-default-bg);
`;
