import styled from 'styled-components';
import { ButtonStyled } from '../Button/Button.styled';
export const SelectboxAnchorStyled = styled(ButtonStyled).withConfig({ displayName: "SelectboxAnchorStyled" }) `
	min-width: inherit;
	position: relative;
`;
export const SelectboxAnchorContentStyled = styled.div.withConfig({ displayName: "SelectboxAnchorContentStyled" }) `
	position: relative;

	& > div {
		overflow: hidden;
		text-overflow: ellipsis;
		padding: 0 1px;
	}
`;
export const SelectboxAnchorTextStyled = styled.div.withConfig({ displayName: "SelectboxAnchorTextStyled" }) ``;
export const SelectboxAnchorCaretStyled = styled.div.withConfig({ displayName: "SelectboxAnchorCaretStyled" }) ``;
export const SelectboxAnchorPrefixStyled = styled.div.withConfig({ displayName: "SelectboxAnchorPrefixStyled" }) ``;
