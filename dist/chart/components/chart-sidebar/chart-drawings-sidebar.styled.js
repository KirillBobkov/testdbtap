import styled from 'styled-components';
import { Scrollable } from '../../../chart-kit/Scrollable/Scrollable';
export const DrawingsSidebarStyled = styled.div.withConfig({ displayName: "DrawingsSidebarStyled" }) `
	position: relative;
	height: 100%;
	background-color: var(--main_chart-bg);

	&:after {
		content: '';
		width: 1px;
		height: 100%;
		background-color: var(--main_chart-grid-line);
		position: absolute;
		top: 0;
		right: 0;
	}
`;
export const SidebarDrawingsItemsStyled = styled.div.withConfig({ displayName: "SidebarDrawingsItemsStyled" }) `
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin: 0;
`;
export const DrawingsListStyled = styled.div.withConfig({ displayName: "DrawingsListStyled" }) `
	height: ${props => (props.isMobile ? 'calc(100% - 132px)' : 'calc(100% - 164px)')};
`;
export const SidebarScrollableStyled = styled(Scrollable).withConfig({ displayName: "SidebarScrollableStyled" }) `
	overflow-y: hidden;
`;
