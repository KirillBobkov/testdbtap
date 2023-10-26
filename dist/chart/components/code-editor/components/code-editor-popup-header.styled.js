import styled from 'styled-components';
import { EditableText } from '../../../../chart-kit/EditableText/EditableText.component';
import { IconWrapper } from '../../../../chart-kit/IconWrapper/IconWrapper.component';
export const CodeEditorPopupHeaderContainer = styled.div.withConfig({ displayName: "CodeEditorPopupHeaderContainer" }) `
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: var(--dropdown-list_item-default-text);
	font-family: var(--font-main-semibold);
	font-size: var(--font-size-m);
	line-height: var(--line-height-m);
`;
export const CodeEditorPopupHeaderEditableText = styled(EditableText).withConfig({ displayName: "CodeEditorPopupHeaderEditableText" }) `
	display: flex;
	align-items: center;
`;
export const CodeEditorPopupHeaderEditText = styled.div.withConfig({ displayName: "CodeEditorPopupHeaderEditText" }) `
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;
export const CodeEditorPopupHeaderLockIcon = styled(IconWrapper).withConfig({ displayName: "CodeEditorPopupHeaderLockIcon" }) `
	margin-right: var(--spacer-2);
`;
export const CodeEditorPopupHeaderEditIcon = styled(IconWrapper).withConfig({ displayName: "CodeEditorPopupHeaderEditIcon" }) `
	margin-left: var(--spacer-2);
`;
export const CodeEditorPopupHeaderSavingIndicator = styled.div.withConfig({ displayName: "CodeEditorPopupHeaderSavingIndicator" }) `
	color: var(--dropdown-description-text);
	margin-left: auto;
	margin-right: 8px;
	line-height: 17px;
`;
