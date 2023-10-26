import styled from 'styled-components';
import { Menu } from '../../../chart-kit/Menu/Menu.component';
import { MenuItem } from '../../../chart-kit/Menu/MenuItem.component';
export const RightClickPopoverMenuStyled = styled(Menu).withConfig({ displayName: "RightClickPopoverMenuStyled" }) `
	min-width: 172px;
	margin: 0;
	padding: 0;
	list-style: none;
	position: relative;
	width: 100%;
`;
export const RightClickPopoverMenuItemStyled = styled(MenuItem).withConfig({ displayName: "RightClickPopoverMenuItemStyled" }) `
	position: relative;
	height: 24px;
	line-height: var(--line-height-s-px);
	margin: 0;
	padding: var(--spacer-1) var(--spacer-5) var(--spacer-1) var(--spacer-1);
	user-select: none;
`;
export const RightClickPopoverMenuItemLabelStyled = styled.div.withConfig({ displayName: "RightClickPopoverMenuItemLabelStyled" }) `
	margin-top: 1px;
	margin-left: 22px;
`;
export const RightClickTradingBtnsAtLabel = styled.span.withConfig({ displayName: "RightClickTradingBtnsAtLabel" }) `
	padding: 0 var(--spacer-1);
	color: var(--databox-text-disabled);
`;
export const RightClickMenuPopoverAnchor = styled.div.withConfig({ displayName: "RightClickMenuPopoverAnchor" }) `
	position: absolute;
	bottom: 0;
	right: 0;
`;
export const RightClickMenuPopoverItemWrapper = styled.div.withConfig({ displayName: "RightClickMenuPopoverItemWrapper" }) ``;
