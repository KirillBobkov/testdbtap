import styled from 'styled-components';
import { SimpleNumericStepperContainerStyled } from '../../../../chart-kit/SimpleNumericStepper/SimpleNumericStepper.styled';
export const ChartSettingsPaddingsControlStyled = styled.div.withConfig({ displayName: "ChartSettingsPaddingsControlStyled" }) `
	width: calc(100% - var(--spacer-2));
	padding: 0 var(--spacer-2);
	height: 28px;
	&:hover {
		background-color: var(--dropdown-hovered-bg);
		border-radius: var(--spacer-1);
	}

	${SimpleNumericStepperContainerStyled} {
		width: 100%;
	}
`;
