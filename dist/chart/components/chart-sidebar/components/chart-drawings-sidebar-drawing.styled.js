import styled, { css } from 'styled-components';
import { DrawingsSidebarButtonWithTooltip } from './chart-drawings-sidebar-button-with-tooltip.component';
export const AddToFavoriteButtonStyled = styled.div.withConfig({ displayName: "AddToFavoriteButtonStyled" }) `
	padding: 0;
	margin: var(--spacer-05);
	width: 20px;
	height: 20px;
	min-width: 15px;
	color: var(--icon-primary-default-bg);
	fill: var(--icon-primary-default-bg);
	&:hover {
		color: var(--link-hovered-text);
	}
	${props => props.disabled &&
    css `
			pointer-events: none;
			color: var(--icon-disabled-default-bg);
			fill: var(--icon-disabled-default-bg);
		`}
`;
export const RemoveFromFavoriteButtonStyled = styled.div.withConfig({ displayName: "RemoveFromFavoriteButtonStyled" }) `
	padding: 0;
	margin: var(--spacer-05);
	width: 20px;
	height: 20px;
	min-width: 15px;
	color: var(--icon-primary-default-bg);
	fill: var(--icon-primary-default-bg);
	&:hover {
		color: var(--link-hovered-text);
	}

	${props => props.disabled &&
    css `
			pointer-events: none;
			color: var(--icon-disabled-default-bg);
			fill: var(--icon-disabled-default-bg);
		`}
`;
export const DrawingsSidebarButtonWithTooltipStyled = styled(DrawingsSidebarButtonWithTooltip).withConfig({ displayName: "DrawingsSidebarButtonWithTooltipStyled" }) `
	${AddToFavoriteButtonStyled} {
		height: 0;
		overflow: hidden;
	}

	&:hover,
	&:focus {
		${RemoveFromFavoriteButtonStyled},
		${AddToFavoriteButtonStyled} {
			height: auto;
		}
	}

	${props => props.showFavoritesOnHoverOnly &&
    css `
			${RemoveFromFavoriteButtonStyled} {
				display: none;
			}
		`}
`;
