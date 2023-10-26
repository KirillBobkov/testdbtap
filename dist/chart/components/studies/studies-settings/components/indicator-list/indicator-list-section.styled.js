import styled from 'styled-components';
export const IndicatorContainerStyled = styled.div.withConfig({ displayName: "IndicatorContainerStyled" }) ``;
export const IndicatorContentStyled = styled.div.withConfig({ displayName: "IndicatorContentStyled" }) `
	position: relative;
`;
export const IndicatorHeaderStyled = styled.header.withConfig({ displayName: "IndicatorHeaderStyled" }) `
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	@media (max-width: 500px) {
		button {
			margin-left: 5px;
			font-size: var(--font-size-m);
			margin-right: 10px;
		}
	}
	@media (max-width: 340px) {
		button {
			margin-left: 5px;
		}
	}
`;
export const IndicatorTitleStyled = styled.h3.withConfig({ displayName: "IndicatorTitleStyled" }) `
	margin: 0;
	padding: 0;
	border: 0;
	display: block;
	font-size: var(--font-size-m);
	font-family: var(--font-main-bold);
	text-transform: uppercase;
	font-style: normal;
	font-stretch: normal;
	line-height: var(--line-height-l-px);
	letter-spacing: 0.84px;
	color: var(--form-title-text);
`;
export const IndicatorFooterStyled = styled.footer.withConfig({ displayName: "IndicatorFooterStyled" }) ``;
