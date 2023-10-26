import styled, { css } from 'styled-components';
import { Popover } from '../Popover/Popover.lazy-component';
import { Selectbox } from '../Selectbox/Selectbox.component';
import { SelectboxAnchor } from '../Selectbox/SelectboxAnchor.component';
import { SelectboxAnchorCaretStyled, SelectboxAnchorContentStyled } from '../Selectbox/SelectboxAnchor.styled';
export const LineEndSelectboxStyled = styled(Selectbox).withConfig({ displayName: "LineEndSelectboxStyled" }) `
	padding: 5px 7px;
	margin-top: 2px;
`;
export const LineEndSelectboxAnchorStyled = styled(SelectboxAnchor).withConfig({ displayName: "LineEndSelectboxAnchorStyled" }) `
	padding: 1px 6px;
	margin: 0;
	min-width: 50px;

	${SelectboxAnchorContentStyled} {
		position: relative;
		display: flex;
		justify-content: center;
	}

	${props => props.caretIcon &&
    css `
			${SelectboxAnchorCaretStyled} {
				display: block;
				position: absolute;
				box-sizing: border-box;
				left: 1px;
				bottom: 1px;

				color: var(--icon-secondary-default-bg);
				width: 10px;
				height: 6px;
			}
		`}
`;
export const LineEndSelectboxPopoverStyled = styled(Popover).withConfig({ displayName: "LineEndSelectboxPopoverStyled" }) ``;
