import styled from 'styled-components';
import { Popover } from '../../../../chart-kit/Popover/Popover.lazy-component';
export const NewsPopoverStyled = styled(Popover).withConfig({ displayName: "NewsPopoverStyled" }) `
	top: 8px;
	width: 230px;
	background-color: var(--dropdown-default-bg);
	padding: var(--spacer-1) 0 var(--spacer-1) var(--spacer-1);
	overflow: visible;

	// this transparent rectangle is needed to avoid closing news popover
	// after hovering chart's news circle
	&::before {
		position: absolute;
		content: '';
		display: block;
		width: inherit;
		height: 20px;
		top: -20px;
		left: 0;
		background: transparent;
	}
`;
export const NewsListStyled = styled.div.withConfig({ displayName: "NewsListStyled" }) `
	max-height: calc(300px - 2 * var(--spacer-1));
`;
export const NewsPopoverDivider = styled.div.withConfig({ displayName: "NewsPopoverDivider" }) `
	width: calc(100% - 2 * var(--spacer-2));
	height: 1px;
	margin-right: var(--spacer-2);
	margin-left: var(--spacer-2);
	background-color: var(--dropdown-list_item-divider-bg);
`;
