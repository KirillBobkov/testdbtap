import { Input } from '../Input/Input.component';
import styled, { css } from 'styled-components';
import { InputContainerStyled, InputStyled } from '../Input/Input.styled';
export const SimpleNumericStepperInputStyled = styled(Input).withConfig({ displayName: "SimpleNumericStepperInputStyled" }) `
	background: transparent;
`;
export const SimpleNumericStepperContainerStyled = styled.label.withConfig({ displayName: "SimpleNumericStepperContainerStyled" }) `
	font-size: var(--font-size-m);
	user-select: none;
	color: var(--checkbox-default-text);
	white-space: nowrap;
	cursor: ${props => (props.orientation === 'h' ? 'ew-resize' : 'ns-resize')};

	${props => props.disabled === true &&
    css `
			color: var(--checkbox-default-text);
			cursor: default;
		`}

	width: fit-content;
	display: flex;
	align-items: center;
	justify-content: flex-start;

	${InputStyled} {
		width: calc(${props => props.innerWidth + 1}px + var(--spacer-2));
		//change to own variable when it appears in figma
		color: var(--dropdown-list_item-selected-text);
		font-family: var(--font-main-semibold);
	}
	${SimpleNumericStepperInputStyled} {
		width: calc(${props => props.innerWidth + 1}px + var(--spacer-2)); // calc innerWidth + current padding
		padding: var(--spacer-unit) var(--spacer-unit);
	}

	${InputContainerStyled} {
		&:hover {
			background: none;
		}
	}
`;
export const SimpleNumericStepperLabelStyled = styled.span.withConfig({ displayName: "SimpleNumericStepperLabelStyled" }) `
	display: inline-block;
	vertical-align: middle;
	font-size: var(--font-size-m);
	line-height: var(--line-height-m);
	font-family: var(--font-main-semibold);
	color: var(--dropdown-list_item-default-text);
	margin-right: var(--spacer-1);

	${props => props.isDisabled &&
    css `
			color: var(--icon-disabled-default-bg);
			cursor: default;
		`};
`;
export const SimpleNumericStepperControlStyled = styled.span.withConfig({ displayName: "SimpleNumericStepperControlStyled" }) `
	display: inline-block;
	vertical-align: middle;
`;
export const SimpleNumericStepperUnitControl = styled.span.withConfig({ displayName: "SimpleNumericStepperUnitControl" }) `
	color: var(--dropdown-list_item-selected-text);
	font-family: var(--font-main-semibold);
	margin-left: var(--spacer-1);
`;
SimpleNumericStepperContainerStyled.displayName = 'CKSimpleNumericStepperContainerStyled';
SimpleNumericStepperLabelStyled.displayName = 'CKSimpleNumericStepperLabelStyled';
SimpleNumericStepperControlStyled.displayName = 'CKSimpleNumericStepperControlStyled';
SimpleNumericStepperUnitControl.displayName = 'CKSimpleNumericStepperUnitControl';
