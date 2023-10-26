import styled from 'styled-components';
import { DropdownMenu } from '../../../../chart-kit/Menu/dropdown-menu/DropdownMenu.styled';
import { Popover } from '../../../../chart-kit/Popover/Popover.lazy-component';
import { Selectbox } from '../../../../chart-kit/Selectbox/Selectbox.component';
export const SelectboxStyled = styled(Selectbox).withConfig({ displayName: "SelectboxStyled" }) `
	padding: 0;
	width: 24px;
	max-width: 24px;
	background: var(--main_chart-bg);
	height: 24px;
	margin-right: var(--spacer-1);
	&:hover {
		background: var(--toolbar-button-default-hover-bg);
		border-radius: 4px;
	}
`;
export const AdaptivePopoverStyled = styled(Popover).withConfig({ displayName: "AdaptivePopoverStyled" }) `
	${DropdownMenu} {
		padding: 5px 0px 5px 5px;
		position: relative;
		overflow: hidden;
	}
`;
