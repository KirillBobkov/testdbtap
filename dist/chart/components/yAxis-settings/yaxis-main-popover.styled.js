import styled, { css } from 'styled-components';
import { Popover } from '../../../chart-kit/Popover/Popover.lazy-component';
export const YAxisMainPopoverStyled = styled(Popover).withConfig({ displayName: "YAxisMainPopoverStyled" }) ``;
export const YAxisMainPopoverMenuContainerStyled = styled.div.withConfig({ displayName: "YAxisMainPopoverMenuContainerStyled" }) `
	box-sizing: border-box;
	height: auto;
	padding: var(--spacer-1);
	user-select: none;
	margin: 0;
`;
export const YAxisMainPopoverAnchorElement = styled.div.withConfig({ displayName: "YAxisMainPopoverAnchorElement" }) `
	position: absolute;
	opacity: 0;
	width: 1px;
	height: 1px;
	left: ${props => props.xPosition}px;

	${props => props.yPosition &&
    css `
			top: ${props.yPosition}px;
		`}
`;
export const YAxisMainPopoverMainSectionStyled = styled.div.withConfig({ displayName: "YAxisMainPopoverMainSectionStyled" }) `
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
export const YAxisMainPopoverMenuItemContentArrowIconStyled = styled.div.withConfig({ displayName: "YAxisMainPopoverMenuItemContentArrowIconStyled" }) `
	position: absolute;
	margin-left: var(--spacer-2);
	color: var(--icon-disabled-default-bg);
	right: 10px;
`;
export const YAxisMainPopoverDivider = styled.div.withConfig({ displayName: "YAxisMainPopoverDivider" }) `
	width: 170px;
	height: 1px;
	margin-top: var(--spacer-1);
	margin-bottom: var(--spacer-1);
	background-color: var(--dropdown-list_item-divider-bg);
`;
export const YAxisMainSettingsItemLabelsAndLinesStyled = styled.div.withConfig({ displayName: "YAxisMainSettingsItemLabelsAndLinesStyled" }) `
	// this transparent rectangle is needed to avoid closing popover
	// after hovering anchor icon and moving it to popover's content
	&::before {
		position: absolute;
		content: '';
		display: block;
		top: -4px;
		left: -4px;
		bottom: -4px;
		right: -4px;
		background: transparent;
	}
`;
