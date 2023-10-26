import styled from 'styled-components';
export const TextNoteContainerStyled = styled.div.withConfig({ displayName: "TextNoteContainerStyled" }) `
	position: absolute;
	z-index: 15;
	// Math floor is needed here to prevent text note "jumping", because canvas vector has integer coordinates
	top: ${props => Math.floor(props.top)}px;
	left: ${props => Math.floor(props.left)}px;
`;
