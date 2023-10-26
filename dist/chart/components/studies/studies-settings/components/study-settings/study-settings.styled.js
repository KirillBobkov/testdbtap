import styled, { css } from 'styled-components';
import { Button } from '../../../../../../chart-kit/Button/Button.component';
import { ButtonIcon } from '../../../../../../chart-kit/Button/ButtonIcon.component';
import { MenuItem } from '../../../../../../chart-kit/Menu/MenuItem.component';
import { NumericStepper } from '../../../../../../chart-kit/NumericStepper/NumericStepper.component';
import { NumericSteppableInputStyled } from '../../../../../../chart-kit/NumericStepper/NumericStepper.styled';
import { SelectboxAnchor } from '../../../../../../chart-kit/Selectbox/SelectboxAnchor.component';
import { SelectboxAnchorStyled, SelectboxAnchorCaretStyled, SelectboxAnchorContentStyled, } from '../../../../../../chart-kit/Selectbox/SelectboxAnchor.styled';
export const StudySettingsTitleWrapperStyled = styled.div.withConfig({ displayName: "StudySettingsTitleWrapperStyled" }) `
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	@media (max-width: 500px) {
		button > div {
			margin-left: 5px;
			margin-right: 10px;
			font-size: var(--font-size-m);
			text-align: end;
		}
	}
`;
export const StudySettingsTitleStyled = styled.h3.withConfig({ displayName: "StudySettingsTitleStyled" }) `
	margin: 0;
	padding: 0;
	border: 0;
	vertical-align: baseline;
	font-family: var(--font-main-bold);
	font-size: var(--font-size-m);
	font-weight: bold;
	line-height: 21px;
	letter-spacing: 0.84px;
	text-transform: uppercase;
	color: var(--form-title-text);
`;
export const StudySettingsEditScriptButtonStyled = styled(ButtonIcon).withConfig({ displayName: "StudySettingsEditScriptButtonStyled" }) `
	padding: 0;
	width: 44px;
	min-width: 0;
	height: 24px;
	flex-shrink: 0;
	margin-left: auto;
	margin-right: 5px;

	&:hover {
		color: var(--link-hovered-text);
	}
`;
export const RestoreToDefaultButtonStyled = styled(Button).withConfig({ displayName: "RestoreToDefaultButtonStyled" }) `
	font-family: var(--font-main);
	font-size: var(--font-size-l);
	padding: 0 var(--spacer-2);
	border: 1px solid transparent;
	background: transparent;
	margin-left: 6px;
`;
export const InputWrapperStyled = styled.div.withConfig({ displayName: "InputWrapperStyled" }) ``;
export const InputsBlockStyled = styled.div.withConfig({ displayName: "InputsBlockStyled" }) `
	width: 100%;
`;
export const InputBlockSettingsStyled = styled(InputsBlockStyled).withConfig({ displayName: "InputBlockSettingsStyled" }) `
	${InputWrapperStyled} {
		&:nth-of-type(n),
		&:nth-of-type(2n) {
			margin-right: 56px;

			@media (max-width: 1440px) {
				margin-right: 46px;
			}
		}
	}
`;
export const InputBlockPlotsStyled = styled(InputsBlockStyled).withConfig({ displayName: "InputBlockPlotsStyled" }) `
	${InputWrapperStyled} {
		&:nth-of-type(2n - 1) {
			margin-right: 16px;

			@media (max-width: 1440px) {
				margin-right: 46px;
			}
		}
	}
`;
export const InputsBlockTitleStyled = styled.h4.withConfig({ displayName: "InputsBlockTitleStyled" }) `
	margin: 0;
	padding: 0;
	border: 0;
	vertical-align: baseline;
	font-family: var(--font-main-bold);
	font-size: var(--font-size-m);
	font-weight: bold;
	line-height: 21px;
	letter-spacing: 0.84px;
	text-transform: uppercase;
	color: var(--form-title-text);
	margin: var(--spacer-2) 0 15px;
	@media (max-width: 460px) {
		margin: var(--spacer-5) 0 15px 0;
	}
`;
export const InputsBlockContentStyled = styled.div.withConfig({ displayName: "InputsBlockContentStyled" }) `
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	margin-bottom: 6px;
`;
export const LineStyled = styled.div.withConfig({ displayName: "LineStyled" }) `
	display: flex;
	flex-direction: row;
	@media (max-width: 460px) {
		flex-direction: column;
	}
`;
export const LineInputStyled = styled.div.withConfig({ displayName: "LineInputStyled" }) `
	display: flex;
	align-items: center;
	@media (max-width: 460px) {
		margin-top: var(--spacer-3);
	}
`;
export const LineInputColorsStyled = styled.div.withConfig({ displayName: "LineInputColorsStyled" }) `
	display: flex;
	align-items: center;
	margin-right: var(--spacer-2);
	@media (max-width: 460px) {
		margin-top: var(--spacer-3);
	}
`;
export const ColorPickerWrapperStyled = styled.div.withConfig({ displayName: "ColorPickerWrapperStyled" }) `
	&:not(:first-child) {
		margin-left: var(--spacer-1);
	}
`;
export const LineInputThickStyled = styled.div.withConfig({ displayName: "LineInputThickStyled" }) `
	position: relative;
	width: 58px;
	margin-right: 32px;
	@media (max-width: 460px) {
		margin-top: var(--spacer-3);
	}
`;
export const LineInputPlotTypeStyled = styled.div.withConfig({ displayName: "LineInputPlotTypeStyled" }) `
	position: relative;
	width: 75px;
	@media (max-width: 460px) {
		margin-top: var(--spacer-5);
		margin-bottom: var(--spacer-5);
	}
`;
export const LineInputPixelsStyled = styled.span.withConfig({ displayName: "LineInputPixelsStyled" }) `
	position: absolute;
	top: 7px;
	left: 54px;
	height: 14px;

	font-size: var(--font-size-l);
	line-height: var(--line-height-l-px);
	margin-left: var(--spacer-2);

	color: var(--dropdown-list_item-default-text);
`;
export const SelectBoxItemStyled = styled(MenuItem).withConfig({ displayName: "SelectBoxItemStyled" }) `
	height: 19px;
	padding: var(--spacer-05) var(--spacer-5) var(--spacer-05) 5px;
	line-height: 15px;
	font-size: var(--font-size-m);
	border-radius: var(--spacer-1);
`;
export const StudySettingsSelectBoxAnchorStyled = styled(SelectboxAnchor).withConfig({ displayName: "StudySettingsSelectBoxAnchorStyled" }) `
	width: 100%;

	${SelectboxAnchorContentStyled} {
		position: relative;

		& > div {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			padding: 0 1px;
		}
	}

	${props => props.caretIcon &&
    css `
			${SelectboxAnchorCaretStyled} {
				display: block;
				position: absolute;
				box-sizing: border-box;
				width: 3px;
				height: 3px;
				left: 1px;
				bottom: 1px;
			}
		`}

	${SelectboxAnchorStyled} {
		width: 100%;
	}
`;
export const LabeledFormFieldContainer = styled.div.withConfig({ displayName: "LabeledFormFieldContainer" }) `
	display: flex;
	flex-direction: column;
	margin-bottom: 11px;
`;
export const LabeledFormFieldLabelStyled = styled.h5.withConfig({ displayName: "LabeledFormFieldLabelStyled" }) `
	height: 14px;
	margin: 0;
	padding: 0;
	margin-bottom: var(--spacer-2);

	font-size: var(--font-size-l);
	line-height: 13px;
	white-space: nowrap;

	color: var(--form-title-text);
	text-transform: capitalize;
`;
export const StudySettingsNumericStepperStyled = styled(NumericStepper).withConfig({ displayName: "StudySettingsNumericStepperStyled" }) `
	${NumericSteppableInputStyled} {
		max-width: 100px;
		width: 100%;
	}
`;
