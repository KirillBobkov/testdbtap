import styled, { css } from 'styled-components';
// TODO review styles, leave only required for base component
export const PopoverStyled = styled.div.withConfig({ displayName: "PopoverStyled" }) `
	position: absolute;
	top: 0;
	box-sizing: border-box;
	z-index: 199;
	overflow: hidden;
	transition: visibility 0s linear 0s;
	box-shadow: 0 25px 30px rgba(0, 0, 0, 0.35); // TODO sync with Mark
	border-radius: var(--spacer-2);

	:root & {
		background-color: transparent;
	}

	${props => css `
		 {
			transform: translate(${props.transformLeft || 0}px, ${props.transformTop || 0}px);
		}
	`}
`;
//#endregion
//#region PopoverContent
export const PopoverContentStyled = styled.div.withConfig({ displayName: "PopoverContentStyled" }) `
	position: relative;

	&:not(:empty) {
		color: var(--dropdown-list_item-default-text, #fff);
		font-size: var(--font-size-m, 16px);
		background-color: var(--dropdown-default-bg, #282828);
	}
`;
//#endregion
//#region HoveredElementAnchor
export const HoveredElementPopoverAnchor = styled.div.withConfig({ displayName: "HoveredElementPopoverAnchor" }) `
	position: absolute;
	opacity: 0;
	width: 1px;
	height: 1px;
`;
//#endregion
