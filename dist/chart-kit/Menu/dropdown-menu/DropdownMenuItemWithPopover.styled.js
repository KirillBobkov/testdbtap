import styled, { css } from 'styled-components';
import { DropdownMenuItemIconStyled, DropdownMenuItemLabelStyled } from './DropdownMenuItem.styled';
export const DropdownMenuItemWithPopoverStyled = styled.li.withConfig({ displayName: "DropdownMenuItemWithPopoverStyled" }) `
	position: relative;
	padding: var(--spacer-1);
	margin: 0;
	display: flex;
	flex: 0 0 100%;
	min-width: 120px;
	border-radius: 4px;
	cursor: pointer;

	&:hover {
		background: var(--dropdown-list_item-hovered-bg);
	}

	&:focus-visible {
		outline: 1px solid var(--button-focus-border);
		outline-offset: -1px;
	}

	${props => props.opened &&
    css `
			&:before {
				content: '';
				position: absolute;
				overflow: hidden;
				top: -11px;
				height: 45px;
				width: 125px;
				z-index: 999;
			}
		`}

	&:before {
		transform: perspective(10px) rotateX(0deg)
			rotateY(${props => (props.popoverAlignment === 'left' ? '12deg' : '-12deg')});
	}

	${props => props.isActive &&
    css `
			${DropdownMenuItemIconStyled},
			${DropdownMenuItemLabelStyled} {
				color: var(--dropdown-list_item-selected-text);
			}
		`}

	${props => props.disabled &&
    css `
			${DropdownMenuItemIconStyled},
			${DropdownMenuItemLabelStyled} {
				color: var(--dropdown-list_item-disabled-text);
			}
		`}
`;
