import styled, { css } from 'styled-components';
export const ButtonStyled = styled.button.withConfig({ displayName: "ButtonStyled" }) `
	position: relative;
	user-select: none;
	display: inline-block;
	vertical-align: middle;
	position: relative;
	box-sizing: border-box;
	font-size: inherit; //override default user-agent stylesheet
	font-family: inherit; //override default user-agent stylesheet
	outline: 1px solid transparent;
	cursor: pointer;

	&[disabled] {
		cursor: default;
	}

	${props => props.isFlat &&
    css `
			background-color: transparent;
			border: none;
			box-shadow: none;
		`}

	${props => props.isLoading &&
    props.isFlat &&
    css `
			background-color: inherit;
		`}
`;
export const ButtonCaretIcon = styled.i.withConfig({ displayName: "ButtonCaretIcon" }) `
	position: absolute;
	left: 1px;
	bottom: 1px;
	height: 3px;
	width: 3px;
	color: var(--icon-secondary-default-bg);

	& svg {
		position: absolute;
		left: 0;
		bottom: 0;
	}
`;
ButtonStyled.displayName = 'CKButtonStyled';
