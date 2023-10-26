import styled, { css } from 'styled-components';
export const MultichartSettingsContainerStyled = styled.div.withConfig({ displayName: "MultichartSettingsContainerStyled" }) `
	font-family: var(--font-main-semibold);
	display: flex;
	padding: var(--spacer-2);
	gap: var(--spacer-2);
`;
export const MultichartSettingsSectionStyled = styled.div.withConfig({ displayName: "MultichartSettingsSectionStyled" }) ``;
export const MultichartSettingsHeaderStyled = styled.div.withConfig({ displayName: "MultichartSettingsHeaderStyled" }) `
	color: var(--dropdown-description-text);
	font-size: var(--font-size-m);
	line-height: var(--line-height-m-px);
	margin-bottom: var(--spacer-2);
`;
export const MultichartSettingsHeaderRightStyled = styled(MultichartSettingsHeaderStyled).withConfig({ displayName: "MultichartSettingsHeaderRightStyled" }) `
	padding-left: var(--spacer-1);
`;
export const MultichartSettingsLayoutSelectorStyled = styled.div.withConfig({ displayName: "MultichartSettingsLayoutSelectorStyled" }) `
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-content: space-between;
	width: 124px;
	height: 124px;
`;
export const MultichartSettingsOptionListStyled = styled.div.withConfig({ displayName: "MultichartSettingsOptionListStyled" }) `
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	font-size: var(--font-size-m);
	line-height: var(--line-height-s-px);
	margin-top: -2px;
`;
export const MultichartSettingsOptionStyled = styled.button.withConfig({ displayName: "MultichartSettingsOptionStyled" }) `
	position: relative;
	display: flex;
	align-items: center;
	user-select: none;
	outline: 1px solid transparent;
	cursor: pointer;
	background-color: inherit;
	border: 0;
	border-radius: var(--spacer-1);
	font-family: var(--font-main-semibold);
	font-size: var(--font-size-m);
	padding: 0;

	&[disabled] {
		cursor: default;
	}

	&:hover {
		background-color: var(--dropdown-list_item-hovered-bg);
	}

	&:focus-visible {
		outline: 1px solid var(--button-focus-border);
		outline-offset: -2px;
	}
`;
export const MultichartSettingsOptionCheckIconStyled = styled.span.withConfig({ displayName: "MultichartSettingsOptionCheckIconStyled" }) `
	position: absolute;
	display: block;
	width: 20px;
	height: 20px;
	color: var(--icon-primary-default-bg);
`;
export const MultichartSettingsOptionTextStyled = styled.span.withConfig({ displayName: "MultichartSettingsOptionTextStyled" }) `
	margin-left: var(--spacer-6);
	padding: var(--spacer-1) var(--spacer-4) var(--spacer-1) 0;
	color: var(--dropdown-list_item-default-text);
	font-size: var(--font-size-m);
	line-height: var(--line-height-m-px);
`;
export const MultichartSettingsLayoutSelectorItemStyled = styled.button.withConfig({ displayName: "MultichartSettingsLayoutSelectorItemStyled" }) `
	position: relative;
	background-color: var(--dropdown-hovered-bg);
	width: 60px;
	height: 38px;
	border: 0;
	outline: 1px solid transparent;
	padding: 0;
	display: block;
	border-radius: var(--spacer-1);

	&:hover {
		${props => !props.active && 'background: var(--main_chart-divider-hover-bg)'};
	}

	${props => props.active &&
    css `
			background: var(--dropdown-list_item-selected-text);
		`}

	&:before,
  	&:after {
		content: '';
		position: absolute;
		background-color: var(--dropdown-default-bg);
	}

	${props => props.layout && layoutItemStyles(props.layout)}

	&:focus {
		outline: 1px solid var(--button-focus-border);
		outline-offset: 0;
		border-radius: 4px;
	}
`;
const layoutItemStyles = (layout) => {
    switch (layout) {
        case '1x1':
            return css ``;
        case '1x2':
            return css `
				&:before {
					width: 2px;
					height: 100%;
					top: 0;
					left: calc(50% - 1px);
				}
			`;
        case '1x3':
            return css `
				&:before {
					width: 2px;
					height: 100%;
					top: 0;
					left: calc(33% - 1px);
				}
				&:after {
					width: 2px;
					height: 100%;
					top: 0;
					left: calc(66% - 1px);
				}
			`;
        case '2x1':
            return css `
				&:before {
					width: 100%;
					height: 2px;
					left: 0;
					top: calc(50% - 1px);
				}
			`;
        case '2x2':
            return css `
				&:after {
					width: 2px;
					height: 100%;
					top: 0;
					left: calc(50% - 1px);
				}
				&:before {
					width: 100%;
					height: 2px;
					left: 0;
					top: calc(50% - 1px);
				}
			`;
        case '3x1':
            return css `
				&:before {
					width: 100%;
					height: 2px;
					left: 0;
					top: calc(33% - 1px);
				}
				&:after {
					width: 100%;
					height: 2px;
					left: 0;
					top: calc(66% - 1px);
				}
			`;
        default:
            return css ``;
    }
};
