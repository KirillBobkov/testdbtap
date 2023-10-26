import styled from 'styled-components';
import { Popover } from '../../../../chart-kit/Popover/Popover.lazy-component';
export const DataMenuPopoverAnchor = styled.div.withConfig({ displayName: "DataMenuPopoverAnchor" }) `
	position: absolute;
	bottom: 0;
	right: 0;
`;
export const DataMenuPopoverContainerStyled = styled.div.withConfig({ displayName: "DataMenuPopoverContainerStyled" }) `
	padding: var(--spacer-1);
`;
export const DataMenuPopoverStyled = styled(Popover).withConfig({ displayName: "DataMenuPopoverStyled" }) `
	margin-top: var(--spacer-1);
	margin-left: -8px;
`;
