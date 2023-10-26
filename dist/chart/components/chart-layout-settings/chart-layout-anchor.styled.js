import styled, { css } from 'styled-components';
import { SelectboxAnchor } from '../../../chart-kit/Selectbox/SelectboxAnchor.component';
import { SelectboxAnchorStyled, SelectboxAnchorCaretStyled, SelectboxAnchorTextStyled, SelectboxAnchorPrefixStyled, SelectboxAnchorContentStyled, } from '../../../chart-kit/Selectbox/SelectboxAnchor.styled';
export const ChartLayoutAnchorStyled = styled(SelectboxAnchor).withConfig({ displayName: "ChartLayoutAnchorStyled" }) `
	${SelectboxAnchorStyled} {
		padding: 0;
		color: var(--button-tertiaty-default-text);
		position: relative;
	}

	${SelectboxAnchorStyled}:before {
		border-top-color: var(--dropdown-border-inside-top-color);
		border-bottom-color: var(--dropdown-border-inside-bottom-color);
		border-left-color: var(--dropdown-border-inside-side-color);
		border-right-color: var(--dropdown-border-inside-side-color);
	}
	${SelectboxAnchorContentStyled} {
		padding-left: var(--spacer-2);
	}

	${props => props.prefixIcon &&
    css `
			${SelectboxAnchorPrefixStyled} {
				display: block;
				position: absolute;
				box-sizing: border-box;
				width: 12px;
				height: 15px;
				left: -4px;
				top: 50%;
				transform: translateY(-50%);
				color: var(--icon-secondary-default-bg);

				& div {
					position: absolute;
					top: 50%;
					transform: translateY(-3px);
					left: 3px;
				}
			}
		`}

	${SelectboxAnchorStyled}:before {
		border-top-color: var(--dropdown-border-inside-top-color);
		border-bottom-color: var(--dropdown-border-inside-bottom-color);
		border-left-color: var(--dropdown-border-inside-side-color);
		border-right-color: var(--dropdown-border-inside-side-color);
	}

	${props => {
    if (props.caretIcon) {
        if (props.isCaretIconChanged) {
            return css `
					${SelectboxAnchorCaretStyled} {
						color: var(--icon-secondary-default-bg);
						width: 10px;
						height: 17px;
					}
				`;
        }
        else {
            return css `
					${SelectboxAnchorCaretStyled} {
						color: var(--icon-secondary-default-bg);
						width: 10px;
						height: 6px;
					}
				`;
        }
    }
    return css ``;
}}

	${SelectboxAnchorTextStyled} {
		white-space: nowrap;
		display: flex;
		align-items: center;
		justify-content: center;
	}
`;
