import styled, { css } from 'styled-components';
import { ButtonIcon } from '../../../../chart-kit/Button/ButtonIcon.component';
import { ButtonInnerStyled } from '../../../../chart-kit/Button/Button.styled';
import { IconWrapper } from '../../../../chart-kit/IconWrapper/IconWrapper.component';
export const DrawingsToolbarContainerStyled = styled.div.withConfig({ displayName: "DrawingsToolbarContainerStyled" }) `
	width: auto;
	position: absolute;
	top: 0;
	left: 0;
	color: var(--icon-primary-default-bg);
	background-color: var(--mini_toolbar-default-bg);
	border-radius: var(--spacer-2);
	z-index: 20;
	${props => props.isSelected && 'padding: 0 var(--spacer-2) 0 0'};
`;
export const DrawingsToolbarStyled = styled.div.withConfig({ displayName: "DrawingsToolbarStyled" }) `
	display: flex;
	align-items: center;
`;
export const ToolbarTextStyled = styled.label.withConfig({ displayName: "ToolbarTextStyled" }) `
	font-size: var(--font-size-l);
	color: var(--dropdown-list_item-default-text);
`;
export const ButtonIconStyled = styled(ButtonIcon).withConfig({ displayName: "ButtonIconStyled" }) `
	height: 24px;
	width: 100%;
	min-width: 24px;
	padding: 0;
	margin: 0;
	background-color: transparent;
	border-radius: var(--spacer-1);

	&:hover {
		background: var(--dropdown-list_item-hovered-bg);
	}

	${ButtonInnerStyled} {
		width: 20px;
		height: 20px;
	}
`;
export const ButtonLockedIconStyled = styled(ButtonIconStyled).withConfig({ displayName: "ButtonLockedIconStyled" }) `
	${ButtonInnerStyled} {
		width: 25px;
		height: 25px;
	}
`;
export const ButtonSettingsIconStyled = styled(ButtonIconStyled).withConfig({ displayName: "ButtonSettingsIconStyled" }) `
	${ButtonInnerStyled} {
		width: 20px;
		height: 20px;
	}
`;
export const ButtonDraggableStyled = styled(ButtonIcon).withConfig({ displayName: "ButtonDraggableStyled" }) `
	height: 20px;
	width: 20px;
	min-width: 7px;
	padding: 0;
	margin: 0;
	margin-right: -4px;
	color: var(--icon-secondary-default-bg);
	background-color: var(--button-primary-draggable);
	font-size: var(--font-size-m);

	&:hover {
		color: var(--icon-primary-default-bg);
		background-color: var(--button-primary-draggable);
		cursor: grab;
		cursor: -moz-grab;
		cursor: -webkit-grab;
	}

	&:active {
		color: var(--icon-primary-default-bg);
		background-color: var(--button-primary-draggable);
		cursor: grabbing;
		cursor: -moz-grabbing;
		cursor: -webkit-grabbing;
	}
`;
export const DrawingsToolbarIconWrapperStyled = styled(IconWrapper).withConfig({ displayName: "DrawingsToolbarIconWrapperStyled" }) `
	svg > path,
	svg > rect {
		${props => !props.preventIconFill &&
    css `
				'fill: var(--icon-primary-default-bg);'
			`}
	}
`;
