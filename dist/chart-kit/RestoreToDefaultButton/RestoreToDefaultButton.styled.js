import styled from 'styled-components';
import { ButtonStyled } from '../Button/Button.styled';
export const RestoreToDefaultWrapper = styled.div.withConfig({ displayName: "RestoreToDefaultWrapper" }) `
	@media (min-width: 480px) {
		display: flex;
		align-items: flex-end;
		justify-self: flex-end;
		flex-grow: 1;
		margin-top: var(--spacer-4);
	}
`;
export const RestoreToDefaultButtonStyled = styled(ButtonStyled).withConfig({ displayName: "RestoreToDefaultButtonStyled" }) `
	color: var(--link-default-text);
	background-color: inherit;
	max-width: fit-content;
	height: 24px;
	&:hover {
		transition: 0.2s;
		background-color: var(--link-hovered-bg);
	}
`;
