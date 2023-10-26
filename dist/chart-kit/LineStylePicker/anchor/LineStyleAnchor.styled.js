import styled from 'styled-components';
import { Button } from '../../Button/default/Button.component';
export const LineStyleAnchorButtonStyled = styled(Button).withConfig({ displayName: "LineStyleAnchorButtonStyled" }) `
	padding: 3px 4px 3px 4px;
	min-width: 0;
	width: 60px;
	border: 0;
	height: 32px;
	border-radius: 4px;
	background-color: var(--dropdown_secondary-bg);
	color: var(--modal-window-text-color);
	&:hover {
		background-color: var(--dropdown_secondary-list_item_hovered-bg);
	}

	&:focus {
		background: var(--button-tertiaty-pressed);
	}

	&:active {
		background: var(--button-tertiaty-pressed);
	}
`;
export const LineStyleAnchorIconStyled = styled.div.withConfig({ displayName: "LineStyleAnchorIconStyled" }) `
	width: 20px;
	height: 14px;
	& > svg {
		color: inherit;
	}
`;
export const LineStyleAnchorContentStyled = styled.div.withConfig({ displayName: "LineStyleAnchorContentStyled" }) `
	display: flex;
	align-items: center;
	flex-wrap: nowrap;
	justify-content: space-between;
`;
export const LineStyleAnchorSelectedLineStyled = styled.div.withConfig({ displayName: "LineStyleAnchorSelectedLineStyled" }) `
	position: relative;
	padding-left: 34px;
`;
export const LineStyleAnchorLineSampleStyled = styled.div.withConfig({ displayName: "LineStyleAnchorLineSampleStyled" }) `
	&::after {
		content: '';
		position: absolute;
		width: 26px;
		top: 50%;
		left: 50%;
		transform: translateY(-50%) translateX(-50%);
	}
`;
export const LineStyleAnchorLineSampleWrapperStyled = styled.div.withConfig({ displayName: "LineStyleAnchorLineSampleWrapperStyled" }) `
	${LineStyleAnchorLineSampleStyled} {
		&::after {
			${({ lineStyle }) => {
    switch (lineStyle) {
        case 'solid-thin':
            return {
                'background-image': 'linear-gradient(to right, var(--icon-primary-default-bg) 100%, transparent 100%)',
                'background-size': '100% 5px',
                height: '1px',
            };
        case 'dashed-thin':
            return {
                'background-image': 'linear-gradient(to right, var(--icon-primary-default-bg) 70%, transparent 70%)',
                'background-size': '7px 5px',
                height: '1px',
            };
        case 'dotted-thin':
            return {
                'background-image': 'linear-gradient(to right, var(--icon-primary-default-bg) 50%, transparent 50%)',
                'background-size': '4px 5px',
                height: '1px',
            };
        case 'solid-normal':
            return {
                'background-image': 'linear-gradient(to right, var(--icon-primary-default-bg) 100%, transparent 100%)',
                'background-size': '100% 5px',
                height: '2px',
            };
        case 'dashed-normal':
            return {
                'background-image': 'linear-gradient(to right, var(--icon-primary-default-bg) 70%, transparent 70%)',
                'background-size': '10px 5px',
                height: '2px',
            };
        case 'dotted-normal':
            return {
                'background-image': 'linear-gradient(to right, var(--icon-primary-default-bg) 50%, transparent 50%)',
                'background-size': '6px 5px',
                height: '2px',
            };
        case 'solid-semibold':
            return {
                'background-image': 'linear-gradient(to right, var(--icon-primary-default-bg) 100%, transparent 100%)',
                'background-size': '100% 5px',
                height: '3px',
            };
        case 'dashed-semibold':
            return {
                'background-image': 'linear-gradient(to right, var(--icon-primary-default-bg) 70%, transparent 70%)',
                'background-size': '16px 5px',
                height: '3px',
            };
        case 'dotted-semibold':
            return {
                'background-image': 'linear-gradient(to right, var(--icon-primary-default-bg) 50%, transparent 50%)',
                'background-size': '10px 5px',
                height: '3px',
            };
        case 'solid-bold':
            return {
                'background-image': 'linear-gradient(to right, var(--icon-primary-default-bg) 100%, transparent 100%)',
                'background-size': '100% 5px',
                height: '4px',
            };
        case 'dashed-bold':
            return {
                'background-image': 'linear-gradient(to right, var(--icon-primary-default-bg) 70%, transparent 70%)',
                'background-size': '16px 5px',
                height: '4px',
            };
        case 'dotted-bold':
            return {
                'background-image': 'linear-gradient(to right, var(--icon-primary-default-bg) 50%, transparent 50%)',
                'background-size': '10px 5px',
                height: '4px',
            };
        default:
            return {};
    }
}}
		}
	}
`;
