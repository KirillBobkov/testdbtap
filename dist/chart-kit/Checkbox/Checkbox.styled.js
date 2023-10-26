import styled from 'styled-components';
export const CheckboxInputStyled = styled.input.withConfig({ displayName: "CheckboxInputStyled" }) ``;
export const CheckboxViewStyled = styled.span.withConfig({ displayName: "CheckboxViewStyled" }) ``;
export const CheckboxIconStyled = styled.span.withConfig({ displayName: "CheckboxIconStyled" }) ``;
export const CheckboxContainerStyled = styled.span.withConfig({ displayName: "CheckboxContainerStyled" }) `
	display: inline-block;
	position: relative;

	${CheckboxInputStyled} {
		position: absolute;
		opacity: 0;
		width: 1px;
		height: 1px;
	}

	${CheckboxIconStyled} {
		display: block;
		margin: 0 auto;
		visibility: ${props => (props.isChecked ? 'visible' : 'hidden')};
	}

	${CheckboxViewStyled} {
		display: inline-block;
		position: relative;
	}
	&[data-focus='true'] {
		outline: 1px solid var(--link-default-text);
		border-radius: 4px;
	}
`;
CheckboxContainerStyled.displayName = 'CKCheckBoxStyled';
