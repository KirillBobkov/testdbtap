import styled from 'styled-components';
export const HoldToActionText = styled.span.withConfig({ displayName: "HoldToActionText" }) `
	user-select: none;
`;
export const HoldToActionTextContainer = styled.div.withConfig({ displayName: "HoldToActionTextContainer" }) ``;
export const HoldToActionHideWrapper = styled.div.withConfig({ displayName: "HoldToActionHideWrapper" }) `
	${({ longPressStarted }) => ({
    visibility: longPressStarted ? 'hidden' : 'visible',
})}
	position: relative;
`;
export const AnimationWrapper = styled.div.withConfig({ displayName: "AnimationWrapper" }) `
	${({ longPressStarted, delay }) => ({
    width: longPressStarted ? '100%' : '0%',
    transition: longPressStarted ? `width ${delay}ms linear` : 'unset',
})}
`;
export const HoldToActionContainer = styled.div.withConfig({ displayName: "HoldToActionContainer" }) `
	display: inline-block;
	width: 100%;
	position: relative;
	${HoldToActionText} {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}

	${HoldToActionTextContainer} {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
	}

	${AnimationWrapper} {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
	}
`;
HoldToActionContainer.displayName = 'CKHoldToActionStyled';
