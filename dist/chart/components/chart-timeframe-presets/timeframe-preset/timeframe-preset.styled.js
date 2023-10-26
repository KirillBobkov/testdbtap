import styled from 'styled-components';
import { Button } from '../../../../chart-kit/Button/Button.component';
import { ButtonInnerStyled } from '../../../../chart-kit/Button/Button.styled';
export const TimeframePresetItemStyled = styled(Button).withConfig({ displayName: "TimeframePresetItemStyled" }) `
	width: fit-content;
	height: 24px;
	min-width: 24px;
	border-radius: var(--spacer-1);
	color: ${props => (props.selected ? 'var(--button-primary-default)' : 'var(--main_chart-value-text)')};

	${ButtonInnerStyled} {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	&:hover {
		background: var(--dropdown-list_item-hovered-bg);
		color: ${props => (props.selected ? 'var(--button-primary-default)' : 'var(--main_chart-value-text)')};
	}
`;
