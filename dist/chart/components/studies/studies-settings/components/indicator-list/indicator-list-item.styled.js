import styled from 'styled-components';
import { IconWrapperStyled } from '../../../../../../chart-kit/IconWrapper/IconWrapper.styled';
import Popover from '../../../../../../chart-kit/Popover/Popover.component';
export const IndicatorListItemContainerStyled = styled.div.withConfig({ displayName: "IndicatorListItemContainerStyled" }) `
	display: flex;
	align-items: center;
	flex-grow: 1;
	height: 32px;
	font-size: var(--font-size-l);
	white-space: nowrap;
	line-height: 32px;
	transition: background-color 120ms ease-out;
	min-width: 0;
	border-radius: 6px;
	padding-left: var(--spacer-2);
	padding-right: var(--spacer-2);

	&:hover {
		background-color: var(--dropdown-list_item-hovered-bg);
	}

	background-color: ${props => props.active && 'var(--dropdown-list_item-hovered-bg)'};

	&:focus {
		outline: 1px solid var(--button-focus-border);
		outline-offset: -1px;
		border-radius: 4px;
	}
`;
export const IndicatorListItemIconStyled = styled.div.withConfig({ displayName: "IndicatorListItemIconStyled" }) `
	min-width: 24px;
	height: 24px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	color: var(--icon-disabled-default-bg);

	@media (max-width: 480px) {
		&:nth-of-type(2) {
			height: 24px;
			margin-left: auto;

			i {
				height: 24px;
			}
		}
	}
`;
export const IndicatorListItemSelectIconStyled = styled(IndicatorListItemIconStyled).withConfig({ displayName: "IndicatorListItemSelectIconStyled" }) `
	color: var(--icon-primary-default-bg);
	&:hover {
		i {
			color: var(--icon-active-bg);
			cursor: default;
		}
	}
`;
export const IndicatorListItemIconUpStyled = styled.div.withConfig({ displayName: "IndicatorListItemIconUpStyled" }) `
	flex-shrink: 0;
`;
export const IndicatorListItemIconDownStyled = styled.div.withConfig({ displayName: "IndicatorListItemIconDownStyled" }) `
	flex-shrink: 0;
`;
export const IndicatorListItemDxIconStyled = styled.div.withConfig({ displayName: "IndicatorListItemDxIconStyled" }) `
	flex-shrink: 0;
`;
export const IndicatorListItemTitleStyled = styled.span.withConfig({ displayName: "IndicatorListItemTitleStyled" }) `
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
	white-space: nowrap;
`;
export const IndicatorListItemLengthStyled = styled.div.withConfig({ displayName: "IndicatorListItemLengthStyled" }) `
	margin-left: 10px;
	margin-right: auto;
	font-size: var(--font-size-s);
	opacity: 0.7;
`;
export const IndicatorListItemDescriptionStyled = styled.div.withConfig({ displayName: "IndicatorListItemDescriptionStyled" }) `
	margin-left: 10px;
	margin-right: auto;
	font-size: var(--font-size-s);
	color: var(--dropdown-description-text);
	margin-top: 2px;
`;
export const IndicatorListItemAddIconStyled = styled(IndicatorListItemIconStyled).withConfig({ displayName: "IndicatorListItemAddIconStyled" }) `
	height: 12px;

	& i {
		width: 24px;
		height: 12px;
	}
`;
export const IndicatorListItemTooltipIconStyled = styled(IconWrapperStyled).withConfig({ displayName: "IndicatorListItemTooltipIconStyled" }) `
	color: ${props => (props.hovered ? 'var(--link-hovered-text)' : 'var(--icon-secondary-default-bg)')};
	cursor: default;
`;
export const IndicatorListItemInfoPopover = styled(Popover).withConfig({ displayName: "IndicatorListItemInfoPopover" }) `
	overflow: visible;

	// this transparent rectangle is needed to avoid closing popover
	// after hovering help icon and moving it to popover's content
	&::before {
		position: absolute;
		content: '';
		display: block;
		width: 20px;
		height: 100%;
		top: 0;
		left: -20px;
		background: transparent;
	}
`;
export const IndicatorListItemInfoStyled = styled.div.withConfig({ displayName: "IndicatorListItemInfoStyled" }) `
	max-width: 320px;
	z-index: 1000;
	background: var(--dropdown-default-bg);
`;
export const IndicatorListItemInfoHeader = styled.div.withConfig({ displayName: "IndicatorListItemInfoHeader" }) `
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: var(--spacer-2);
	border-bottom: 1px solid var(--dropdown-list_item-divider-bg);
`;
export const IndicatorListItemInfoWrapper = styled.div.withConfig({ displayName: "IndicatorListItemInfoWrapper" }) `
	max-height: 300px;
`;
export const IndicatorListItemInfoText = styled.div.withConfig({ displayName: "IndicatorListItemInfoText" }) `
	padding: var(--spacer-2);
	margin: 0;
	font-family: var(--font-main);
	font-size: var(--font-size-m);
	line-height: var(--line-height-l-px);
	color: var(--dropdown-list_item-default-text);
	text-align: left;
`;
export const IndicatorListItemDocsLinkStyled = styled.a.withConfig({ displayName: "IndicatorListItemDocsLinkStyled" }) `
	display: block;
	text-decoration: none;
	color: var(--link-default-text);
	padding: var(--spacer-2);
	&:hover {
		color: var(--link-hovered-text);
	}
`;
export const IndicatorListItemIconsContainer = styled.div.withConfig({ displayName: "IndicatorListItemIconsContainer" }) `
	display: flex;
	align-items: center;
	margin-left: auto;
	margin-right: 0;
`;
