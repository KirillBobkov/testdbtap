import styled from 'styled-components';
export const SliderSelectContainerStyled = styled.div.withConfig({ displayName: "SliderSelectContainerStyled" }) `
	height: 32px;
	display: flex;
	background: var(--selector-default-bg);
	color: var(--input-default-text);
	border: 1px solid var(--dropdown-default-border);
	border-radius: 6px;
	cursor: pointer;
	user-select: none;
`;
