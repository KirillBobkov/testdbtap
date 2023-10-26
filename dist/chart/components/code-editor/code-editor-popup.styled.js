import styled from 'styled-components';
import { PopupUI } from '../../../chart-kit/Popup/PopupUI.component';
import { PopupContainerStyled, PopupContentStyled, PopupFooterStyled, PopupHeaderStyled, } from '../../../chart-kit/Popup/PopupUI.styled';
import { StyledScrollableContainer } from '../../../chart-kit/Scrollable/Scrollable.styled';
export const CodeEditorPopupUIStyled = styled(PopupUI).withConfig({ displayName: "CodeEditorPopupUIStyled" }) `
	${PopupContainerStyled} {
		border: 1px solid var(--dropdown-default-border);
		background-color: var(--modal_window-header-bg);

		@supports (backdrop-filter: blur()) {
			background-color: rgba(20, 20, 19, 0.4);
			backdrop-filter: blur(25px);
		}

		// vendor prefix is needed for safari
		@supports (-webkit-backdrop-filter: blur()) {
			background-color: rgba(20, 20, 19, 0.4);
			-webkit-backdrop-filter: blur(25px);
		}

		font-size: var(--font-size-m);
		line-height: var(--line-height-m);
		font-family: 'IBM Plex Mono SemiBold', monospace;
		font-weight: 600;

		${StyledScrollableContainer} {
			// only for DXCF-1956 - bug with popup resizing
			height: auto;
			overflow-x: hidden;
			height: auto;
		}
	}

	${PopupFooterStyled} {
		padding: var(--spacer-1) 0;
		margin-left: var(--spacer-3);
		margin-right: var(--spacer-3);
		width: auto;
		border-top: 1px solid var(--dropdown-list_item-divider-bg);
	}

	${PopupContentStyled} {
		display: flex;
		flex-flow: column;
		padding: 0;
		width: 500px;
		max-width: 1000px;
		height: 356px;
		max-height: 356px;
	}

	${PopupHeaderStyled} {
		height: 38px;
		padding: 10px 8px 12px 8px;
		background: unset;
	}
`;
export const CodeEditorPopupFlexContainer = styled.div.withConfig({ displayName: "CodeEditorPopupFlexContainer" }) `
	display: flex;
	align-items: ${props => props.alignItems};
	justify-content: ${props => props.justifyContent};
`;
export const CodeEditorPopupIWStyled = styled.div.withConfig({ displayName: "CodeEditorPopupIWStyled" }) `
	margin-right: 1px;
`;
export const CodeEditorPopupEditorContainerStyled = styled.div.withConfig({ displayName: "CodeEditorPopupEditorContainerStyled" }) `
	padding: 0 10px 0 4px;
	cursor: text;
	${props => (props.isEmpty ? '' : 'margin-bottom: 15px;')}
`;
export const CodeEditorPopupInfoStyled = styled.div.withConfig({ displayName: "CodeEditorPopupInfoStyled" }) `
	${props => (props.isEmpty ? '' : 'margin-bottom: 10px;')}
`;
export const CodeEditorPopupPendingStatusStyled = styled.div.withConfig({ displayName: "CodeEditorPopupPendingStatusStyled" }) `
	padding-left: 28px;
`;
export const CodeEditorPopupErrorsContainerStyled = styled.div.withConfig({ displayName: "CodeEditorPopupErrorsContainerStyled" }) `
	padding-left: 28px;
	color: #ec3f44;
`;
export const CodeEditorPopupFreeAreaFocusHandlerStyled = styled.div.withConfig({ displayName: "CodeEditorPopupFreeAreaFocusHandlerStyled" }) `
	flex-grow: 1;
`;
