import styled from 'styled-components';
import { Popover } from '../../../chart-kit/Popover/Popover.lazy-component';
export const PopoverStyled = styled(Popover).withConfig({ displayName: "PopoverStyled" }) ``;
export const MultiChartDropdownStyled = styled.div.withConfig({ displayName: "MultiChartDropdownStyled" }) `
	@media (max-width: 480px) {
		display: none;
	}
`;
