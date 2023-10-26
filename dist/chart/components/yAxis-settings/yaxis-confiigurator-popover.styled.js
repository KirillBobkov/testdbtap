import styled, { css } from 'styled-components';
import { IconWrapperStyled } from '../../../chart-kit/IconWrapper/IconWrapper.styled';
import { RightClickPopoverMenuItemStyled } from '../right-click-menu/right-click-menu.styled';
export const YAxisPopoverMenuItemStyled = styled(RightClickPopoverMenuItemStyled).withConfig({ displayName: "YAxisPopoverMenuItemStyled" }) `
	${props => props.disabled &&
    css `
			:hover {
				background: var(--dropdown-default-bg);
			}
			color: var(--button-secondary-disabled-text);
		`}
`;
export const YAxisPopoverMenuItemContentStyled = styled.div.withConfig({ displayName: "YAxisPopoverMenuItemContentStyled" }) `
	display: flex;
	align-items: center;
	width: inherit;

	${props => props.disabled &&
    css `
			color: var(--button-secondary-disabled-text);
		`}
`;
export const YAxisPopoverMenuItemContentTextStyled = styled.div.withConfig({ displayName: "YAxisPopoverMenuItemContentTextStyled" }) `
	display: flex;
	align-items: center;
	flex-grow: 1;
	margin-top: 1px;
	margin-left: -2px;
`;
export const YAxisPopoverMenuItemContentTextSubStyled = styled(YAxisPopoverMenuItemContentTextStyled).withConfig({ displayName: "YAxisPopoverMenuItemContentTextSubStyled" }) `
	margin-left: 1px;
`;
export const YAxisPopoverMenuItemLabelsAndLinesStyled = styled(YAxisPopoverMenuItemStyled).withConfig({ displayName: "YAxisPopoverMenuItemLabelsAndLinesStyled" }) `
	overflow: visible;

	${YAxisPopoverMenuItemContentTextStyled} {
		margin-left: var(--spacer-05);
	}
`;
export const YAxisPopoverMenuItemContentIconStyled = styled.div.withConfig({ displayName: "YAxisPopoverMenuItemContentIconStyled" }) `
	width: 20px;
	margin-right: var(--spacer-1);
	color: var(--checkbox-tick-color);

	${IconWrapperStyled} {
		width: auto;
		height: auto;

		& svg {
			width: auto;
			height: auto;
		}
	}

	${props => props.disabled &&
    css `
			color: var(--button-secondary-disabled-text);
		`}
`;
export const YAxisPopoverMoveScaleLabelItem = styled.div.withConfig({ displayName: "YAxisPopoverMoveScaleLabelItem" }) `
	margin-top: 1px;
	margin-left: 22px;
`;
