import styled from 'styled-components';
export const SidebarSeparatorStyled = styled.div.withConfig({ displayName: "SidebarSeparatorStyled" }) `
	width: 100%;
	height: ${props => props.styles.height}px;
	visibility: ${props => (props.scrollTop > 0 ? 'visible' : 'hidden')};
	overflow: hidden;
	margin-top: ${props => -1 * props.styles.height}px;
	background-color: var(--main_chart-grid-line);
`;
