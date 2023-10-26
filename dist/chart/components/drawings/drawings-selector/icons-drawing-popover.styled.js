import styled from 'styled-components';
import { Popover } from '../../../../chart-kit/Popover/Popover.lazy-component';
export const IconsDrawingPopoverStyled = styled(Popover).withConfig({ displayName: "IconsDrawingPopoverStyled" }) `
	max-height: 300px;
	margin-left: 6px;
	top: -2px;
`;
export const IconsDrawingPopoverWrapperStyled = styled.div.withConfig({ displayName: "IconsDrawingPopoverWrapperStyled" }) `
	padding: var(--spacer-1);
	display: flex;
	flex-wrap: wrap;
	max-width: 190px;
`;
export const IconsDrawingIconWrapperStyled = styled.span.withConfig({ displayName: "IconsDrawingIconWrapperStyled" }) `
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 3px 3px;
	margin: 1px;
	max-height: 24px;
	max-width: 24px;
	cursor: pointer;

	&:focus-visible {
		border-radius: 4px;
		outline: 1px solid var(--button-focus-border);
	}

	&:hover {
		background: var(--dropdown-list_item-hovered-bg);
		border-radius: 4px;
	}
`;
