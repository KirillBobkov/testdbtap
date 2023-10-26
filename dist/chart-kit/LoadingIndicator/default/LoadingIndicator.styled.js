import styled, { keyframes } from 'styled-components';
const LoadingAnimation = keyframes `
	0% {
		transform: perspective(120px) rotateX(0deg) rotateY(0deg);
	}
	50% {
		transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
	}
	100% {
		transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
	}
`;
export const LoadingIndicatorStyled = styled.div.withConfig({ displayName: "LoadingIndicatorStyled" }) `
	display: inline-block;
	vertical-align: middle;
	width: 1em;
	height: 1em;
	background-color: white;
	animation: ${LoadingAnimation} 1.2s infinite ease-in-out;
`;
LoadingIndicatorStyled.displayName = 'CKLoadingIndicatorStyled';
