import styled from 'styled-components';
import { InputContainerStyled } from '../Input/Input.styled';
export const OpacityContainerStyled = styled.div.withConfig({ displayName: "OpacityContainerStyled" }) `
	height: 24px;
	display: flex;
	align-items: center;
	font-size: var(--font-size-m);
	line-height: var(--line-height-m-px);

	${InputContainerStyled} {
		display: flex;
	}
`;
