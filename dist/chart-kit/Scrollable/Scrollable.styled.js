import styled from 'styled-components';
const scrollbarTrackColor = 'transparent';
export const StyledScrollableContainer = styled.div.withConfig({ displayName: "StyledScrollableContainer" }) `
	overflow-y: auto;
	overflow-x: hidden;
	height: 100%;
	width: 100%;
	scrollbar-color: var(--scrollbar) ${scrollbarTrackColor};
	scrollbar-width: ${props => (props.visible ? 'thin' : 'none')};

	&::-webkit-scrollbar {
		width: ${props => {
    // wheeling scroll mode must have 10px width, but transparent.
    // it becomes visible only while wheeling
    if (!props.visible && props.mode === 'wheeling') {
        return '10px';
    }
    return props.visible ? '10px' : '0';
}};
	}

	&::-webkit-scrollbar-corner {
		background: ${scrollbarTrackColor};
	}

	&::-webkit-scrollbar-track {
		background-color: ${scrollbarTrackColor};
	}

	&::-webkit-scrollbar-thumb {
		border-radius: 100px;
		border: 3px solid transparent;
		background-clip: content-box;
		background-color: ${props => (props.visible ? 'var(--scrollbar)' : 'transparent')};
		transition: background-color 150ms ease-out;
	}

	&::-webkit-scrollbar-thumb:active {
		background-color: var(--dropdown-list_item-hovered-bg);
	}
`;
