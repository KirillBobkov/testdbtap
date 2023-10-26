import styled from 'styled-components';
import { Popover } from '../Popover/Popover.lazy-component';
import { PopoverContentStyled } from '../Popover/Popover.styled';
export const TooltipStyled = styled(Popover).withConfig({ displayName: "TooltipStyled" }) `
	border-radius: var(--spacer-1);
	border: none;
	top: 0;
	font-family: var(--font-main-semibold);

	${PopoverContentStyled} {
		padding: var(--spacer-1) var(--spacer-2);
		line-height: var(--line-height-m);
	}
`;
