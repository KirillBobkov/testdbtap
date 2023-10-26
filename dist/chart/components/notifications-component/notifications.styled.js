import styled from 'styled-components';
export const NotificationContainerStyled = styled.div.withConfig({ displayName: "NotificationContainerStyled" }) `
	position: absolute;
	z-index: 999;
	transform: translate(-50%, 0);
	left: ${props => props.position.x + (props.isSidebarExpanded ? 110 : 10) + 'px'};
	top: ${props => props.position.y}px;
`;
export const NotificationStyled = styled.div.withConfig({ displayName: "NotificationStyled" }) `
	padding: 8px 12px;
	background: var(--dropdown-hovered-bg);
	color: var(--dropdown-list_item-default-text);
	border-radius: 24px;
`;
