import styled from 'styled-components';
import { Popup } from '../../../../chart-kit/Popup/Popup.lazy-component';
import { PopupContainerStyled, PopupHeaderStyled } from '../../../../chart-kit/Popup/PopupUI.styled';
import { StyledScrollableContainer } from '../../../../chart-kit/Scrollable/Scrollable.styled';
import { ChartSettingsContainer, ChartSettingsTabsStyled } from '../chart-settings.styled';
export const ChartSettingsPopupStyled = styled(Popup).withConfig({ displayName: "ChartSettingsPopupStyled" }) `
	${StyledScrollableContainer} {
		overflow-x: hidden;
	}
	${PopupContainerStyled} {
		height: calc(var(--cvh, 1vh) * 100);
		width: 100vw;
		position: fixed;
		border-radius: 0;
		${PopupHeaderStyled} {
			background-color: inherit;
			border-bottom: 1px solid var(--dropdown-list_item-divider-bg);
		}
	}

	${ChartSettingsContainer} {
		width: 100%;
	}

	${ChartSettingsTabsStyled} {
		height: 100vh;
		border-right: 1px solid var(--dropdown-list_item-divider-bg);
	}
`;
export const ChartSettingsPopupHeaderStyled = styled.div.withConfig({ displayName: "ChartSettingsPopupHeaderStyled" }) `
	display: flex;
	position: relative;
	width: 100%;
	font-family: var(--font-main-semibold);
	font-size: var(--font-size-m);
	line-height: var(--line-height-m);
	color: var(--dropdown-list_item-default-text);
	padding: var(--spacer-2) var(--spacer-3) 0;
`;
export const ChartSettingsPopupHeaderTitleStyled = styled.h2.withConfig({ displayName: "ChartSettingsPopupHeaderTitleStyled" }) `
	position: absolute;
	font-size: var(--font-size-m);
	font-family: var(--font-main-semibold);
	top: var(--spacer-2);
	left: var(--spacer-3);
	bottom: var(--spacer-1);
	margin: 0;
	margin-top: var(--spacer-1);
	padding: 0;
`;
