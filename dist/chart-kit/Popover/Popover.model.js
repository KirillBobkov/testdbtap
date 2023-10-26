import { eq, number } from 'fp-ts';
const popoverPositions = ['top', 'right', 'left', 'bottom'];
const popoverAlignments = ['start', 'center', 'end'];
// Used to make an little distance between anchor and popover
// popover position is:
// 	 "right" => x + 4px;
// 	 "left" => x - 4px;
// 	 "bottom" => y + 4px;
// 	 "top" => y - 4px;
const OFFSET_FOR_POPOVER = 4;
export function calculatePopoverPlacement({ position, align, anchorPosition, popoverSize, parentContainer, }) {
    const positionsQueue = getPositionsQueue(position);
    const alignmentQueue = getAlignmentQueue(align);
    let coords = calculateCoordinatesForPosition(position, align, anchorPosition, popoverSize);
    for (const positionToCheck of positionsQueue) {
        let innerCalledBreak = false;
        for (const alignmentToCheck of alignmentQueue) {
            const coordinates = calculateCoordinatesForPosition(positionToCheck, alignmentToCheck, anchorPosition, popoverSize);
            const overflowing = checkCoordinatesOverflow(coordinates, popoverSize, parentContainer);
            if (!overflowing) {
                coords = limitCoordinatesToBounds(coordinates, parentContainer, popoverSize);
                innerCalledBreak = true;
                break;
            }
        }
        if (innerCalledBreak) {
            break;
        }
    }
    return coords;
}
function calculateCoordinatesForPosition(position, align, anchor, popover) {
    const mainAxis = getMainAxisFromPosition(position);
    const commonY = anchor.top + anchor.height / 2 - popover.height / 2;
    const commonX = anchor.left + anchor.width / 2 - popover.width / 2;
    let coords;
    switch (position) {
        case 'top':
            coords = { x: commonX, y: anchor.top - popover.height - OFFSET_FOR_POPOVER };
            break;
        case 'bottom':
            coords = { x: commonX, y: anchor.top + anchor.height + OFFSET_FOR_POPOVER };
            break;
        case 'right':
            coords = { x: anchor.left + anchor.width + OFFSET_FOR_POPOVER, y: commonY };
            break;
        case 'left':
            coords = { x: anchor.left - popover.width - OFFSET_FOR_POPOVER, y: commonY };
            break;
        default:
            coords = { x: commonX, y: commonY };
    }
    const size = getSizeFromAxis(mainAxis);
    const commonAlign = anchor[size] / 2 - popover[size] / 2;
    const isVertical = mainAxis === 'x';
    switch (align) {
        case 'start':
            coords[mainAxis] += commonAlign * (isVertical ? -1 : 1);
            break;
        case 'end':
            coords[mainAxis] -= commonAlign * (isVertical ? -1 : 1);
            break;
        default:
    }
    return coords;
}
function checkCoordinatesOverflow(coordinates, popover, container) {
    const overflowTop = coordinates.y < container.top;
    const overflowLeft = coordinates.x < container.left;
    const overflowRight = coordinates.x + popover.width > container.left + container.width;
    const overflowBottom = coordinates.y + popover.height > container.top + container.height;
    return overflowTop || overflowLeft || overflowRight || overflowBottom;
}
function getMainAxisFromPosition(position) {
    return ['top', 'bottom'].includes(position) ? 'x' : 'y';
}
function getSizeFromAxis(axis) {
    return axis === 'y' ? 'height' : 'width';
}
function getPositionsQueue(position) {
    const indexOf = popoverPositions.indexOf(position);
    if (indexOf === 0) {
        return [...popoverPositions];
    }
    const positionsFromSelected = popoverPositions.slice(indexOf);
    const restPositions = popoverPositions.slice(0, indexOf);
    return [...positionsFromSelected, ...restPositions];
}
function getAlignmentQueue(align) {
    const indexOf = popoverAlignments.indexOf(align);
    if (indexOf === 0) {
        return [...popoverAlignments];
    }
    const alignmentsFromSelected = popoverAlignments.slice(indexOf);
    const restAlignments = popoverAlignments.slice(0, indexOf);
    return [...alignmentsFromSelected, ...restAlignments];
}
const coordinatesEq = eq.struct({
    x: number.Eq,
    y: number.Eq,
});
export function compareCoordinates(cs1, cs2) {
    return coordinatesEq.equals(cs1, cs2);
}
export function mapPositionToCoordinates(position) {
    return { x: position.left, y: position.top };
}
export function limitCoordinatesToBounds(coords, bounds, popoverSize) {
    const x = Math.max(bounds.left, Math.min(coords.x, bounds.left + bounds.width - popoverSize.width));
    const y = Math.max(bounds.top, Math.min(coords.y, bounds.top + bounds.height - popoverSize.height));
    return { x, y };
}
