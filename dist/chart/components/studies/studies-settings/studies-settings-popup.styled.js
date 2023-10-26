import styled, { css } from 'styled-components';
import { Button } from '../../../../chart-kit/Button/Button.component';
import { Popup } from '../../../../chart-kit/Popup/Popup.lazy-component';
import { PopupContainerStyled, PopupContentStyled, PopupFooterStyled, } from '../../../../chart-kit/Popup/PopupUI.styled';
export const StudiesSettingsPopupStyled = styled(Popup).withConfig({ displayName: "StudiesSettingsPopupStyled" }) `
	${PopupFooterStyled} {
		padding: 0;
		display: flex;
		justify-content: space-between;
	}

	${PopupContentStyled} {
		overflow: auto;

		@media (max-width: 650px) {
			${props => props.isMobile &&
    css `
					height: 73vh;
				`}
		}
	}

	${PopupContainerStyled} {
		box-shadow: 0 25px 30px rgb(0 0 0 / 35%);

		@media (max-width: 650px) {
			${props => props.isMobile &&
    css `
					max-height: 100vh;
					height: 85vh;
				`}
			width: 100%;
		}
	}
`;
export const FooterButtonStyled = styled(Button).withConfig({ displayName: "FooterButtonStyled" }) `
	margin: var(--spacer-2) var(--spacer-2) var(--spacer-2) 0;
	font-size: var(--font-size-l);
`;
export const StudiesMaxCountStyled = styled.span.withConfig({ displayName: "StudiesMaxCountStyled" }) `
	font-size: var(--font-size-l);
	color: var(--dropdown-description-text);
	margin: 14px 14px 0 14px;
`;
export const StudiesSaveCancelButtonsWrapper = styled.div.withConfig({ displayName: "StudiesSaveCancelButtonsWrapper" }) ``;
