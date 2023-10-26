import styled, { css } from 'styled-components';
import { MenuItemActionButton } from '../../../chart-kit/Menu/action-button/MenuItemActionButton.component';
export const ChartLayersCommonItemStyled = styled.div.withConfig({ displayName: "ChartLayersCommonItemStyled" }) `
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
	height: 24px;
	width: 100%;
	font-size: var(--font-size-m);
	line-height: var(--line-height-m-px);
	color: var(--dropdown-list_item-default-text);
	border-radius: var(--spacer-1);
	white-space: nowrap;
	list-style: none;
	user-select: none;
	transition: background-color 150ms ease-out;
	cursor: pointer;

	&:hover {
		background-color: var(--dropdown-list_item-divider-bg);
	}

	${props => props.isSelected &&
    css `
			& {
				background-color: var(--dropdown-list_item-hovered-bg);
			}
		`}

	${props => props.isHidden &&
    css `
			& {
				color: var(--dropdown-description-text);
			}
		`}
`;
export const ChartLayersCommonItemContentStyled = styled.div.withConfig({ displayName: "ChartLayersCommonItemContentStyled" }) `
	display: block;
	overflow: hidden;
	text-overflow: ellipsis;
	min-width: 80px;
	width: inherit;
`;
export const ChartLayersCommonItemControlsStyled = styled.div.withConfig({ displayName: "ChartLayersCommonItemControlsStyled" }) `
	display: flex;
	cursor: pointer;
`;
export const ChartLayersCommonItemButtonStyled = styled(MenuItemActionButton).withConfig({ displayName: "ChartLayersCommonItemButtonStyled" }) `
	& {
		display: flex;
		visibility: hidden;
		color: var(--icon-secondary-default-bg);
		svg path {
			fill: var(--icon-secondary-default-bg);
		}
	}

	&:hover,
	&:focus {
		color: var(--icon-primary-default-bg);
		svg path {
			fill: var(--icon-primary-default-bg);
		}
	}

	${props => props.active &&
    css `
			& {
				color: var(--icon-secondary-default-bg);
				svg path {
					fill: var(--icon-secondary-default-bg);
				}
			}

			&:hover,
			&:focus {
				color: var(--icon-primary-default-bg);
				svg path {
					fill: var(--icon-primary-default-bg);
				}
			}
		`}

	${props => props.visible &&
    css `
			&,
			&:hover,
			&:focus {
				visibility: visible;
			}
		`}
`;
