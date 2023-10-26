import styled from 'styled-components';
export const ToolbarItemStyled = styled.div.withConfig({ displayName: "ToolbarItemStyled" }) `
	margin: ${props => (props.margin ? `0 var(--spacer-05)` : `0`)};
	padding: ${props => (props.padding ? `var(--spacer-1)` : `0`)};

	&:last-child {
		margin-right: 0;
	}
`;
