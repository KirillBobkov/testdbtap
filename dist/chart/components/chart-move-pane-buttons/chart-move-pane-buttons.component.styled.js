import styled from 'styled-components';
import { ButtonIcon } from '../../../chart-kit/Button/ButtonIcon.component';
export const ChartMovePaneContainerStyled = styled.div.attrs(props => ({
    style: {
        top: `${props.top}px`,
        right: `${props.right}px`,
        visibility: props.isHovered ? 'visible' : 'hidden',
        opacity: props.isHovered ? 1 : 0,
    },
})).withConfig({ displayName: "ChartMovePaneContainerStyled" }) `
	display: flex;
	position: absolute;
	margin-top: var(--spacer-1);
	transition: opacity 0.3s ease;
`;
export const ChartMovePaneButtonStyled = styled(ButtonIcon).withConfig({ displayName: "ChartMovePaneButtonStyled" }) `
	width: 24px;
	min-width: 24px;
	height: 24px;
	margin-right: var(--spacer-05);
	margin-left: var(--spacer-05);
	color: var(--icon-primary-default-bg);
	border-radius: 4px;

	background: var(--button-tertiary-default);
	&:hover {
		background: var(--button-tertiary-hover);
	}
	&:first-child {
		margin-left: auto;
	}
`;
