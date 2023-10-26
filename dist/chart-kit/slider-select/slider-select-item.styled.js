import styled, { css } from 'styled-components';
export const SliderSelectItemStyled = styled.div.withConfig({ displayName: "SliderSelectItemStyled" }) `
	height: 32px;
	width: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 6px;
	transition: background-color 200ms ease-out;
	background-color: var(--selector-default-bg);

	${props => props.isActive &&
    css `
			background-color: var(--selector-active-bg);
			color: var(--icon-active-bg);

			& svg path {
				fill: var(--icon-active-bg);
			}
		`};
`;
export const SliderSelectItemIconStyled = styled.div.withConfig({ displayName: "SliderSelectItemIconStyled" }) `
	height: 18px;
	width: 18px;
`;
