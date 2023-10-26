import styled from 'styled-components';
import { ButtonStyled } from '../../../../chart-kit/Button/Button.styled';
import { PopupContainerStyled, PopupContentStyled, PopupFooterStyled, } from '../../../../chart-kit/Popup/PopupUI.styled';
import { Popup } from '../../../../chart-kit/Popup/Popup.lazy-component';
export const DrawingPopupStyled = styled(Popup).withConfig({ displayName: "DrawingPopupStyled" }) `
	${PopupContainerStyled} {
		border-radius: 8px;
	}

	${PopupContentStyled} {
		max-height: 650px;
		max-width: 466px;
		min-width: 466px;
		padding: var(--spacer-4) var(--spacer-7);

		// ORDER OF MEDIAs MATTER
		// max-height should be the first
		// adds vertical adaptivity to a popup content
		// 780px is a total max height of the popup
		@media (max-height: 780px) {
			// header + footer + gap between top and bottom of a popup and a viewport
			--height-indent-popup: 140px;
			max-height: calc(var(--cvh, 1vh) * 100 - var(--height-indent-popup));
		}

		@media (max-width: 768px) {
			--height-header-plus-footer: 84px;
			min-width: calc(100vw - var(--scrollableScrollBarSize));
			// --cvh is a custom css property created to resolve the problem
			// of vh prop on a mobile devices
			// vh is calculated incorrectly on the mobiles because of url section
			height: calc(var(--cvh, 1vh) * 100 - var(--height-header-plus-footer));
			max-height: calc(var(--cvh, 1vh) * 100 - var(--height-header-plus-footer));
		}
	}

	${PopupFooterStyled} {
		box-sizing: border-box;
		padding: var(--spacer-3);
		grid-template-rows: 1fr;
		grid-template-columns: auto auto;
		justify-content: space-between;
	}
`;
//#region footer actions
export const DrawingPopupActionsStyled = styled.div.withConfig({ displayName: "DrawingPopupActionsStyled" }) `
	display: flex;
	justify-content: space-between;

	${ButtonStyled} {
		font-size: var(--font-size-l);
	}
`;
export const DrawingPopupAdditionalActionsStyled = styled.div.withConfig({ displayName: "DrawingPopupAdditionalActionsStyled" }) `
	${ButtonStyled} {
		font-family: var(--font-main-semibold);
		font-size: var(--font-size-m);
		line-height: var(--line-height-m);
		color: var(--link-default-text);
		padding: 0 var(--spacer-2);
	}
`;
//#endregion
