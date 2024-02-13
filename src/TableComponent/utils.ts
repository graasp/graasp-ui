import { SuppressKeyboardEventParams } from '@ag-grid-community/core';

// ref: https://www.ag-grid.com/javascript-data-grid/component-cell-renderer/
function getAllFocusableElementsOf(el: Element): Element[] {
  return Array.from(
    el.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((focusableEl: Element) => {
    return (focusableEl as HTMLElement).tabIndex !== -1;
  });
}

function getEventPath(event: Event): HTMLElement[] {
  const path = [];
  let currentTarget = event.target as HTMLElement | null;

  while (currentTarget) {
    path.push(currentTarget);
    currentTarget = currentTarget.parentElement;
  }

  return path;
}

/**
 * Capture whether the user is tabbing forwards or backwards and suppress keyboard event if tabbing
 * outside of the children
 * Allow children to be tabbed
 */
export function suppressKeyboardEventForParentCell({
  event,
}: SuppressKeyboardEventParams): boolean {
  const { key, shiftKey } = event;
  const path = getEventPath(event);
  const isTabForward = key === 'Tab' && shiftKey === false;
  const isTabBackward = key === 'Tab' && shiftKey === true;

  let suppressEvent = false;

  // Handle cell children tabbing
  if (isTabForward || isTabBackward) {
    const eGridCell = path.find((el) => {
      if (el.classList === undefined) return false;
      const GRID_CELL_CLASSNAME = 'ag-cell';
      return el.classList.contains(GRID_CELL_CLASSNAME);
    });

    if (!eGridCell) {
      return suppressEvent;
    }

    const focusableChildrenElements = getAllFocusableElementsOf(
      eGridCell,
    ) as HTMLElement[];
    const lastCellChildEl =
      focusableChildrenElements[focusableChildrenElements.length - 1];
    const firstCellChildEl = focusableChildrenElements[0];

    // Suppress keyboard event if tabbing forward within the cell and the current focused element is not the last child
    if (isTabForward && focusableChildrenElements.length > 0) {
      const isLastChildFocused =
        lastCellChildEl && document.activeElement === lastCellChildEl;
      if (!isLastChildFocused) {
        suppressEvent = true;
      }
    }
    // Suppress keyboard event if tabbing backwards within the cell, and the current focused element is not the first child
    else if (isTabBackward && focusableChildrenElements.length > 0) {
      const cellHasFocusedChildren =
        eGridCell.contains(document.activeElement) &&
        eGridCell !== document.activeElement;

      // Manually set focus to the last child element if cell doesn't have focused children
      if (!cellHasFocusedChildren) {
        lastCellChildEl.focus();
        // Cancel keyboard press, so that it doesn't focus on the last child and then pass through the keyboard press to
        // move to the 2nd last child element
        event.preventDefault();
      }

      const isFirstChildFocused =
        firstCellChildEl && document.activeElement === firstCellChildEl;
      if (!isFirstChildFocused) {
        suppressEvent = true;
      }
    }
  }

  return suppressEvent;
}
