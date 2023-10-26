import styled from 'styled-components';
export const IconWrapperStyled = styled.i.withConfig({ displayName: "IconWrapperStyled" }) `
	display: flex;
	justify-content: center;
	align-items: center;
	width: fit-content;
	height: 100%;
	color: inherit;

	svg {
		width: ${({ width }) => (width ? `${width}px` : 'unset')};
		height: ${({ height }) => (height ? `${height}px` : 'unset')};
		display: block;
		color: inherit;
	}
`;
IconWrapperStyled.displayName = 'CKIconWrapperStyled';
