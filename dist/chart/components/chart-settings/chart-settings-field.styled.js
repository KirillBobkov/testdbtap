import styled from 'styled-components';
import { ifStyle } from '../../../utils/styled.utils';
export const ChartSettingsFieldContainerStyled = styled.label.withConfig({ displayName: "ChartSettingsFieldContainerStyled" }) `
	display: flex;
	align-items: center;
	font-size: var(--font-size-l);
	user-select: none;
	color: var(--checkbox-default-text);
	white-space: nowrap;
	cursor: pointer;

	${props => ifStyle(props.disabled) `
			color: var(--checkbox-default-text);
			cursor: default;
		`}

	${props => ifStyle(props.subfield) `
			padding-left: 22px;
		`}

    ${props => ifStyle(props.align === 'right') `
			max-width: 180px;
			width: 100%;
			min-width: 180px;
			display: flex;
			align-items: center;
			justify-content: space-between;
		`}
`;
export const ChartSettingsFieldLabelStyled = styled.span.withConfig({ displayName: "ChartSettingsFieldLabelStyled" }) `
	display: inline-block;
	vertical-align: middle;
	width: 100%;
	font-size: var(--font-size-m);
	line-height: var(--line-height-m);
	font-family: var(--font-main-semibold);

	${props => ifStyle(props.align) `
			margin-right: 15px;
		`}

	${props => ifStyle(props.hint) `
			display: block;
			margin-left: 0;
			margin-bottom: var(--spacer-2);
		`}

    ${props => ifStyle(props.secondary) `
			color: var(--form-title-text);
		`}

    ${props => ifStyle(props.isDisabled) `
			color: var(--dropdown-list_item-disabled-text);
			cursor: default;
		`}
`;
export const ChartSettingsFieldControlStyled = styled.span.withConfig({ displayName: "ChartSettingsFieldControlStyled" }) `
	display: flex;
	margin-right: var(--spacer-1);
	width: ${props => (props.controlsCount > 1 ? 'auto' : '20px')};
	height: 20px;

	& > *:not(:last-child) {
		margin-right: var(--spacer-1);
	}
`;
export const ChartSettingsFieldHintStyled = styled.span.withConfig({ displayName: "ChartSettingsFieldHintStyled" }) `
	display: inline-block;
	vertical-align: middle;
	margin-left: 10px;
`;
