import styled from 'styled-components';
export const DrawingsSidebarFooterStyled = styled.div.withConfig({ displayName: "DrawingsSidebarFooterStyled" }) `
	width: ${props => (props.expanded ? '100%' : '29px')};
	font-family: var(--font-main-semibold);
	font-weight: 600;
`;
