import styled from 'styled-components';
import { DropdownMenu } from '../../../chart-kit/Menu/dropdown-menu/DropdownMenu.styled';
import { Popover } from '../../../chart-kit/Popover/Popover.lazy-component';
import { PopoverContentStyled } from '../../../chart-kit/Popover/Popover.styled';
export const ChartSnapshotDropdownStyled = styled(DropdownMenu).withConfig({ displayName: "ChartSnapshotDropdownStyled" }) `
	min-width: 220px;
`;
export const ChartSnapshotPopoverStyled = styled(Popover).withConfig({ displayName: "ChartSnapshotPopoverStyled" }) `
	${PopoverContentStyled}:not(:empty) {
		display: flex;
		flex-direction: column;
	}
`;
