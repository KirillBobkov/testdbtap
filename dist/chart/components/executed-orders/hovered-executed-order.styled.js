import styled from 'styled-components';
import { Popover } from '../../../chart-kit/Popover/Popover.lazy-component';
export const POPOVER_HEIGHT = 19;
export const HoveredExecutedOrderPopoverStyled = styled(Popover).withConfig({ displayName: "HoveredExecutedOrderPopoverStyled" }) `
	width: fit-content;
	height: ${() => `${POPOVER_HEIGHT}px`};
	border-radius: 3px;
	background-color: var(--dropdown-default-bg);
	padding: 0 var(--spacer-2);
`;
export const HoveredExecutedOrderPopoverLabel = styled.span.withConfig({ displayName: "HoveredExecutedOrderPopoverLabel" }) `
	line-height: ${() => `${POPOVER_HEIGHT}px`};
`;
