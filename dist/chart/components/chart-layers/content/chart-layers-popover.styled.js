import styled from 'styled-components';
import { Popover } from '../../../../chart-kit/Popover/Popover.lazy-component';
import { PopoverContentStyled } from '../../../../chart-kit/Popover/Popover.styled';
export const ChartLayersPopoverStyled = styled(Popover).withConfig({ displayName: "ChartLayersPopoverStyled" }) `
	${PopoverContentStyled} {
		width: 200px;
	}
`;
