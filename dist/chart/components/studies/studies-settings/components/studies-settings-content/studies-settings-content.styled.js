import styled, { css } from 'styled-components';
import { IndicatorContainerStyled, IndicatorContentStyled, IndicatorFooterStyled, } from '../indicator-list/indicator-list-section.styled';
import { IndicatorListItemDescriptionStyled, IndicatorListItemTitleStyled, } from '../indicator-list/indicator-list-item.styled';
import { Button } from '../../../../../../chart-kit/Button/Button.component';
import { ButtonIcon } from '../../../../../../chart-kit/Button/ButtonIcon.component';
import { ButtonInnerStyled } from '../../../../../../chart-kit/Button/Button.styled';
import { HoldToAction } from '../../../../../../chart-kit/HoldToAction/HoldToAction.component';
import { AnimationWrapper, HoldToActionText, HoldToActionTextContainer, } from '../../../../../../chart-kit/HoldToAction/HoldToAction.styled';
import { UL } from '../../../../../../chart-kit/UL/UL';
import { StyledScrollableContainer } from '../../../../../../chart-kit/Scrollable/Scrollable.styled';
export const WrapperStyled = styled.div.withConfig({ displayName: "WrapperStyled" }) `
	display: flex;
	height: 100%;
	padding-top: var(--spacer-3);
	box-sizing: border-box;
	touch-action: none;
`;
export const LeftSectionStyled = styled.div.withConfig({ displayName: "LeftSectionStyled" }) `
	display: flex;
	font-family: var(--font-main);
	max-height: auto;
	${StyledScrollableContainer} {
		${props => !props.isMobile &&
    css `
				@media (max-width: 1440px) {
					width: 322px;
				}

				width: 302px;
			`};
	}

	${IndicatorContainerStyled} {
		padding: 0 10px;
		border-right: 1px solid var(--dropdown-list_item-divider-bg);

		@media (max-width: 680px) {
			padding: 0 5px;
		}
	}

	${IndicatorContentStyled} {
		height: calc(100% - 37px);
		overflow: hidden;
		border-radius: 0.5px;

		& > div {
			height: 100%;
		}

		@media (max-width: 1440px) {
			width: 322px;
		}

		@media (max-width: 680px) {
			width: 100%;
		}

		@media (max-width: 500px) {
			${IndicatorListItemTitleStyled} {
				font-size: var(--font-size-m);
				text-overflow: ellipsis;
				width: 50px;
				max-width: 50px;
			}
		}

		@media (max-height: 500px) {
			height: 80%;
		}
	}

	${IndicatorFooterStyled} {
		display: flex;
		align-items: center;
		padding: 9px 0 var(--spacer-6) 0;
	}

	${IndicatorListItemTitleStyled} {
		flex-grow: 1;
		min-width: 0;
		max-width: 245px;
		overflow: hidden;
	}
`;
export const RightSectionWrapperStyled = styled.div.withConfig({ displayName: "RightSectionWrapperStyled" }) `
	flex-grow: 1;
	width: 100%;
	min-width: 100px;

	@media (max-width: 900px) {
		max-width: 500px;
		width: 100%;
		min-width: 300px;
	}

	@media (max-width: 680px) {
		width: 70%;
		min-width: auto;
	}
`;
export const RightSectionStyled = styled.div.withConfig({ displayName: "RightSectionStyled" }) `
	max-height: 422px;
	padding: 0 10px;

	@media (max-width: 680px) {
		width: 100%;
		height: 100%;
		max-height: 64vh;
		box-sizing: border-box;
	}

	@media (max-height: 500px) {
		max-height: 64vh;
	}

	@media (max-width: 450px) {
		min-width: 110px;
		width: 100%;
	}

	@media (max-width: 350px) {
		width: 180px;
		max-width: 180px;
	}

	${IndicatorContentStyled} {
		${props => props.dragging &&
    css `
				background-color: transparent;
				transition: background-color 150ms ease-out;
				&::after {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					border: 2px dashed var(--dropdown-list_item-selected-text);
					border-radius: var(--spacer-1);
				}
				&:hover {
					background-color: var(--dropdown-list_item-hovered-bg);
				}
			`}
	}
`;
export const AddedIndicatorListItemStyled = styled.div.withConfig({ displayName: "AddedIndicatorListItemStyled" }) `
	width: 100%;
	${IndicatorListItemTitleStyled} {
		font-size: var(--font-size-l);
	}

	${IndicatorListItemDescriptionStyled} {
		font-size: var(--font-size-l);
		color: var(--dropdown-description-text);
		@media (max-width: 680px) {
			max-width: 200px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
`;
export const StudiesListStyled = styled.div.withConfig({ displayName: "StudiesListStyled" }) `
	margin: 0;
	padding: 0;
	border: 0;
	font: inherit;
	vertical-align: baseline;
	list-style: none;
	height: 385px;
`;
export const AddedListStyled = styled(UL).withConfig({ displayName: "AddedListStyled" }) `
	margin: 0;
	border: 0;
	font: inherit;
	vertical-align: baseline;
	list-style: none;
	box-sizing: content-box;
	height: 160px;
	width: 100%;
	padding: var(--spacer-2) 0;
	border-radius: 0.5px;
`;
export const SettingsSectionStyled = styled.div.withConfig({ displayName: "SettingsSectionStyled" }) `
	padding-top: 15px;
`;
export const EmptyStyled = styled.div.withConfig({ displayName: "EmptyStyled" }) `
	padding: 10px;
	font-size: 13px;
	text-align: center;
`;
export const ListItemStyled = styled.li.withConfig({ displayName: "ListItemStyled" }) `
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: var(--dropdown-list_item-default-text);
	line-height: 2.17;
	position: relative;
	background-color: var(--dropdown-list_item-hovered-bg);
	transform: none !important;
`;
export const DeleteButtonStyled = styled(Button).withConfig({ displayName: "DeleteButtonStyled" }) `
	padding: 0;
	height: auto;
	font-family: var(--font-main);
	font-size: var(--font-size-l);
	line-height: 32px;
	font-weight: 500;
	text-align: right;
	min-width: 62px;
	text-decoration: underline;
	background: none;
	outline: 1px solid transparent;
`;
export const AddButtonStyled = styled(ButtonIcon).withConfig({ displayName: "AddButtonStyled" }) `
	background: none;
	border: none;
	outline: 1px solid transparent;
	padding: 0;
	color: var(--icon-active-bg);
	${ButtonInnerStyled} {
		width: 32px;
		height: 32px;
		margin: 0;
		color: var(--icon-secondary-default-bg);
		${props => props.selected && 'color: var(--icon-active-bg)'};
	}

	${ButtonInnerStyled}:hover {
		color: var(--icon-active-bg);
	}
`;
export const RemoveButtonStyled = styled(ButtonIcon).withConfig({ displayName: "RemoveButtonStyled" }) `
	position: absolute;
	top: 5px;
	right: var(--spacer-1);
	margin-right: var(--spacer-3);
	padding: 0;
	display: block;
	min-width: 16px;
	width: 16px;
	height: 16px;
	color: inherit;
	transform: translateX(var(--spacer-1));

	${ButtonInnerStyled} {
		overflow: hidden;
		color: var(--icon-secondary-default-bg);

		&:hover {
			color: var(--icon-active-bg);
		}
	}
`;
export const ScriptDeleteButtonStyled = styled(ButtonIcon).withConfig({ displayName: "ScriptDeleteButtonStyled" }) `
	position: absolute;
	top: 50%;
	right: var(--spacer-3);
	transform: translateY(-50%);
	padding: 0;
	display: block;
	width: 14px;
	height: 20px;
	min-width: 14px;
	color: inherit;
	cursor: default;
	fill: var(--icon-primary-default-bg);
	${ButtonInnerStyled} {
		width: 14px;
	}

	${ButtonInnerStyled}:hover {
		color: var(--icon-active-bg);
	}
`;
export const HoldToActionStyled = styled(HoldToAction).withConfig({ displayName: "HoldToActionStyled" }) `
	${HoldToActionText} {
		color: var(--dropdown-list-item-default-text);
	}

	${HoldToActionTextContainer} {
		background-color: var(--dropdown-list_item-hovered-bg);
		padding-left: 38px;
		border-radius: 6px;
	}

	${AnimationWrapper} {
		background-color: var(--dropdown-list_item-hovered-bg);
		border-top-left-radius: 6px;
		border-bottom-left-radius: 6px;
	}
`;
