import styled from 'styled-components';
export const EditableTextFieldStyled = styled.input.withConfig({ displayName: "EditableTextFieldStyled" }) `
	border-width: 0;
	padding: 0;
	background-color: transparent;
	color: var(--dropdown-list_item-default-text);
	font-family: inherit;
	font-size: inherit;
	line-height: inherit;
	white-space: nowrap;
	user-select: auto;
	width: 100%;

	&:focus-visible {
		outline: none;
	}

	&::selection,
	&::-webkit-selection {
		background-color: rgba(255, 170, 0, 0.2);
	}
`;
export const EditableTextStyled = styled.div.withConfig({ displayName: "EditableTextStyled" }) `
	box-sizing: content-box !important;
	cursor: ${props => (props.disabled ? 'inherit' : 'pointer')};
	max-width: ${props => props.maxWidth};
	border-radius: var(--spacer-1);
	padding: var(--spacer-1);
	overflow: hidden;
	text-overflow: ellipsis;
`;
