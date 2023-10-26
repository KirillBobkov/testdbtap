import styled, { css } from 'styled-components';
import { ButtonInnerStyled } from '../../../../chart-kit/Button/Button.styled';
import { ButtonWithTooltip } from '../../../../chart-kit/Button/ButtonWithTooltip';
import { IconWrapper } from '../../../../chart-kit/IconWrapper/IconWrapper.component';
export const DrawingsSidebarBWTIconContainerStyled = styled.div.withConfig({ displayName: "DrawingsSidebarBWTIconContainerStyled" }) `
	display: flex;
	justify-content: center;
	align-items: center;
	margin: var(--spacer-05);
	min-width: 20px;
	width: 20px;
	height: 20px;
	color: var(--dropdown-list_item-default-text);
`;
export const DrawingsSidebarBWTLabelStyled = styled.div.withConfig({ displayName: "DrawingsSidebarBWTLabelStyled" }) `
	text-align: start;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	padding: var(--spacer-1);
	color: var(--dropdown-list_item-default-text);
	font-family: var(--font-main-semibold);
	line-height: var(--line-height-m);
	font-size: var(--font-size-m);
	user-select: none;
	-moz-user-select: none;
`;
export const DrawingsSidebarButtonWithTooltipStyled = styled(ButtonWithTooltip).withConfig({ displayName: "DrawingsSidebarButtonWithTooltipStyled" }) `
	position: relative;
	height: 24px;
	width: calc(100% - 2 * var(--spacer-05));
	display: flex;
	justify-content: center;
	align-items: center;
	margin: var(--spacer-05);
	padding: 0;
	border-radius: 4px;
	color: var(--icon-primary-default-bg);
	fill: currentColor;
	overflow: hidden;
	white-space: nowrap;

	${ButtonInnerStyled} {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	&:hover {
		background-color: var(--dropdown-list_item-hovered-bg);
	}

	${DrawingsSidebarBWTLabelStyled} {
		flex-grow: 2;
	}

	${props => props.isActive &&
    css `
			${DrawingsSidebarBWTIconContainerStyled},
			${DrawingsSidebarBWTLabelStyled} {
				color: var(--dropdown-list_item-selected-text);
			}
		`}
	${props => props.disabled &&
    css `
			${DrawingsSidebarBWTIconContainerStyled},
			${DrawingsSidebarBWTLabelStyled} {
				color: var(--dropdown-list_item-disabled-text);
			}
		`}

	${props => !props.expanded &&
    css `
			width: 24px !important;
			min-width: 24px !important;

			${DrawingsSidebarBWTIconContainerStyled} {
				margin: 0;
			}

			${DrawingsSidebarBWTLabelStyled} {
				/**
				* these styles allow to make some content hidden but still be accessible to screen-reader, good for a11y
				* @doc-tags a11y
				*/
				clip: rect(0 0 0 0);
				-webkit-clip-path: inset(50%);
				clip-path: inset(50%);
				height: 0.1rem;
				overflow: hidden;
				position: absolute;
				white-space: nowrap;
				width: 0.1rem;
			}
		`}
`;
export const DrawingsSidebarPopoverIWStyled = styled(IconWrapper).withConfig({ displayName: "DrawingsSidebarPopoverIWStyled" }) `
	color: var(--icon-disabled-default-bg);
`;
