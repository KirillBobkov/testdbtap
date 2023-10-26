import styled from 'styled-components';
import { ifStyle } from '../../utils/styled.utils';
export const PopupBackdropStyled = styled.div.withConfig({ displayName: "PopupBackdropStyled" }) `
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	visibility: hidden;
	transition: visibility 0s linear 0.3s, top 0s linear 0.3s;
	overflow: hidden;

	${props => ifStyle(props.isMobile) `
		position: fixed;
	`}

	${props => ifStyle(props.isOpened) `
		visibility: visible;
		transition-delay: 0s, 0s;
	`}

	${props => ifStyle(!props.isModal) `
		pointer-events: none;
		${PopupContainerStyled} {
			pointer-events: auto;
		}
	`}
`;
export const PopupContainerStyled = styled.div.withConfig({ displayName: "PopupContainerStyled" }) `
	display: block;
	position: absolute;
`;
export const PopupContainerDraggableStyled = styled.div.withConfig({ displayName: "PopupContainerDraggableStyled" }) `
	display: block;
	position: absolute;
	width: 100%;
`;
export const PopupGridStyled = styled.div.withConfig({ displayName: "PopupGridStyled" }) `
	display: grid;
	grid-template-rows: max-content 1fr max-content;
	grid-template-columns: auto;
	height: 100%;
`;
export const PopupHeaderStyled = styled.header.withConfig({ displayName: "PopupHeaderStyled" }) `
	${props => ifStyle(props.dividerVisible) `
		border-bottom: 1px solid var(--dropdown-list_item-divider-bg);
	`}
`;
export const PopupContentStyled = styled.section.withConfig({ displayName: "PopupContentStyled" }) ``;
export const PopupFooterStyled = styled.footer.withConfig({ displayName: "PopupFooterStyled" }) `
	display: grid;
	grid-row-start: 3;
	grid-row-end: 4;
`;
export const PopupUIStyled = styled(PopupBackdropStyled).withConfig({ displayName: "PopupUIStyled" }) `
	z-index: ${props => 99 + (props.zIndex ?? 0)};
	pointer-events: none;

	${PopupContainerStyled} {
		pointer-events: auto;
		box-sizing: border-box;
		font-size: var(--font-size-l);
		background-color: var(--dropdown-default-bg);
		box-shadow: 0 7px 15px var(--dropdown-shadow);
		color: var(--dropdown-list_item-default-text);
		border-radius: 6px;
	}

	${PopupHeaderStyled} {
		padding: 10px 15px;
		height: 40px;
		box-sizing: border-box;
		background-color: var(--modal_window-header-bg);
		display: flex;
		align-items: center;
		background-image: linear-gradient(
			88deg,
			var(--modal-window-header-bg-color-1),
			var(--modal-window-header-bg-color-2)
		);
		box-shadow: 0 -1px 0 var(--modal-window-header-shadow-color) inset;
		font-size: var(--font-size-xl);
		font-family: var(--font-main-semibold);
		border-top-left-radius: 6px;
		border-top-right-radius: 6px;

		cursor: grab;
		cursor: -moz-grab;
		cursor: -webkit-grab;
		border-bottom: 1px solid var(--dropdown-list_item-divider-bg);

		&:active {
			cursor: grabbing;
			cursor: -moz-grabbing;
			cursor: -webkit-grabbing;
		}
	}

	${PopupContentStyled} {
		position: relative;
		color: var(--modal-window-text-color);
	}

	${PopupFooterStyled} {
		position: relative;
		border-top: 1px solid var(--main_chart-scale-visible-bg);
		width: 100%;
		padding: var(--spacer-3);
	}

	${props => ifStyle(props.isModal) `
		pointer-events: all;

		&:after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: -1;
			background-color: var(--modal-window-blocking-bg-color);
		}

		${PopupContainerStyled} {
			box-shadow: 0 6px 25px var(--modal-window-shadow-color);
		}
	`}
`;
